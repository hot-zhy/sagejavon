<script setup lang="ts">
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  NAutoComplete,
  NButton,
  NImageGroup,
  NInput,
  NSpace,
  useDialog,
  useMessage,
} from "naive-ui";
import html2canvas from "html2canvas";
import { storeToRefs } from "pinia";
import { Message } from "./components";
import { useScroll } from "./hooks/useScroll";
import { useChat } from "./hooks/useChat";
import { useUsingContext } from "./hooks/useUsingContext";
import { smartQueryStream } from "./api/smart_query_stream";
// import { chatTutor } from "./api/chat_tutor";
import { HoverButton, SvgIcon } from "@/components/common";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { useChatStore, usePromptStore } from "@/store";
import { fetchProgramTutor } from './api/program_tutor';
import { t } from "@/locales";
import QuestionHover from "@/components/question-list/QuestionHover.vue";
let controller = new AbortController();

// const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'

const route = useRoute();
const dialog = useDialog();
const ms = useMessage();

const chatStore = useChatStore();

const { isMobile } = useBasicLayout();
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } =
  useChat();
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll();
const { usingContext, toggleUsingContext } = useUsingContext();

const uuid = localStorage.getItem("program-uuid");

const dataSources = computed(() =>
  chatStore.getChatByUuid(+localStorage.getItem("program-uuid"))
);
console.log(dataSources);
const getEnabledNetwork = computed(() => chatStore.getEnabledNetwork);
// const conversationList = computed(() => dataSources.value.filter(item => (!item.inversion && !!item.conversationOptions)))

// chatStore.clearChatByUuid(+uuid)

const prompt = ref<string>("");
const loading = ref<boolean>(false);
const inputRef = ref<Ref | null>(null);

// 添加PromptStore
const promptStore = usePromptStore();

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
const { promptList: promptTemplate } = storeToRefs<any>(promptStore);

// 未知原因刷新页面，loading 状态不会重置，手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading)
    updateChatSome(+localStorage.getItem("program-uuid"), index, {
      loading: false,
    });
});
function handleSubmit() {
  onConversation();
}

async function callChatGLM(message: string) {
  try {
    const res = await smartQueryStream(message);
    console.log(res.data);
    return res.data;
  } catch (err) {
    // 在这里处理获取用户信息失败的情况
    console.error(err);
    throw err; // 这里抛出错误以便在调用处捕获
  }
}

async function onConversation() {
  const message = prompt.value;

  // 将用户的聊天保存到数据库
  chatTutor({
    chatId: Number(localStorage.getItem("active-uuid")),
    role: 0,
    content: message,
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("数据库添加成功-tutor");
      } else {
        // 更新失败
      }
    })
    .catch((err) => {
      console.error("新增失败:", err);
    });

  if (loading.value) return;

  if (!message || message.trim() === "") return;

  controller = new AbortController();

  addChat(+localStorage.getItem("program-uuid"), {
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  });
  scrollToBottom();
  loading.value = true;
  prompt.value = "";
  const options: Chat.ConversationRequest = {
    conversationId: usingContext.value
      ? window.location.hash
      : Math.random().toString(),
  };


  try {
    const response = await fetchProgramTutor(message);

    if (response.status === 500) {
      addChat(+localStorage.getItem("program-uuid"), {
        dateTime: new Date().toLocaleString(),
        text: "账户已经欠费，请联系工作人员进行充值！",
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: {
          prompt: "账户已经欠费，请联系工作人员进行充值！",
          options: {},
        },
      });
    } else if (response.status === 200) {
      const data = response.data;
      const answer = data.data.response;

      addChat(+localStorage.getItem("program-uuid"), {
        dateTime: new Date().toLocaleString(),
        text: "SageJavon思考中....",
        loading: true,
        inversion: false,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      });
      scrollToBottom();

      const finalResponse = answer;
      updateChat(+localStorage.getItem("program-uuid"), dataSources.value.length - 1, {
        dateTime: new Date().toLocaleString(),
        text: finalResponse,
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {},
        requestOptions: { prompt: message, options: {} },
      });

      // 保存模型回复
      chatTutor({
        chatId: Number(localStorage.getItem("active-uuid")),
        role: 1,
        content: finalResponse,
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("数据库添加成功-tutor");
          }
        })
        .catch((err) => {
          console.error("新增失败:", err);
        });

      scrollToBottom();
    }
  } catch (error) {
    console.error('调用失败:', error);
    scrollToBottom();
  } finally {
    loading.value = false;
  }

}

function handleExport() {
  if (loading.value) return;

  const d = dialog.warning({
    title: t("chat.exportImage"),
    content: t("chat.exportImageConfirm"),
    positiveText: t("common.yes"),
    negativeText: t("common.no"),
    onPositiveClick: async () => {
      try {
        d.loading = true;
        const ele = document.getElementById("image-wrapper");
        const canvas = await html2canvas(ele as HTMLDivElement, {
          useCORS: true,
        });
        const imgUrl = canvas.toDataURL("image/png");
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = imgUrl;
        tempLink.setAttribute("download", "chat-shot.png");
        if (typeof tempLink.download === "undefined")
          tempLink.setAttribute("target", "_blank");

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(imgUrl);
        d.loading = false;
        ms.success(t("chat.exportSuccess"));
        Promise.resolve();
      } catch (error: any) {
        console.error("error", error);
        ms.error(t("chat.exportFailed"));
      } finally {
        d.loading = false;
      }
    },
  });
}

function handleDelete(index: number) {
  if (loading.value) return;

  dialog.warning({
    title: t("chat.deleteMessage"),
    content: t("chat.deleteMessageConfirm"),
    positiveText: t("common.yes"),
    negativeText: t("common.no"),
    onPositiveClick: () => {
      chatStore.deleteChatByUuid(+localStorage.getItem("program-uuid"), index);
    },
  });
}

function handleToggleNetwork() {
  chatStore.toggleNetwork();
}

function handleClear() {
  if (loading.value) return;

  dialog.warning({
    title: t("chat.clearChat"),
    content: t("chat.clearChatConfirm"),
    positiveText: t("common.yes"),
    negativeText: t("common.no"),
    onPositiveClick: () => {
      chatStore.clearChatByUuid(+localStorage.getItem("program-uuid"));
    },
  });
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  } else {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
}

function handleStop() {
  if (loading.value) {
    controller.abort();
    loading.value = false;
  }
}

// 可优化部分
// 搜索选项计算，这里使用value作为索引项，所以当出现重复value时渲染异常(多项同时出现选中效果)
// 理想状态下其实应该是key作为索引项,但官方的renderOption会出现问题，所以就需要value反renderLabel实现
const searchOptions = computed(() => {
  if (prompt.value.startsWith("/")) {
    return promptTemplate.value
      .filter((item: { key: string }) =>
        item.key.toLowerCase().includes(prompt.value.substring(1).toLowerCase())
      )
      .map((obj: { value: any }) => {
        return {
          label: obj.value,
          value: obj.value,
        };
      });
  } else {
    return [];
  }
});

// value反渲染key
const renderOption = (option: { label: string }) => {
  for (const i of promptTemplate.value) {
    if (i.value === option.label) return [i.key];
  }
  return [];
};

const placeholder = computed(() => {
  if (isMobile.value) return t("chat.placeholderMobile");
  return t("chat.placeholder");
});

const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === "";
});

const footerClass = computed(() => {
  let classes = ["p-4"];
  if (isMobile.value)
    classes = [
      "sticky",
      "left-0",
      "bottom-0",
      "right-0",
      "p-2",
      "pr-3",
      "overflow-hidden",
    ];
  return classes;
});

onMounted(() => {
  scrollToBottom();
  if (inputRef.value && !isMobile.value) inputRef.value?.focus();
});

onUnmounted(() => {
  if (loading.value) controller.abort();
});


import { t as globalT } from '@/locales'

const t = globalT

</script>

<template>
  <div
    style="background-color: rgba(3, 34, 81, 0.1)"
    class="flex flex-col w-full h-full"
  >
  <QuestionHover :index="3"/>
    <HeaderComponent
      v-if="isMobile"
      :using-context="usingContext"
      @export="handleExport"
      @handle-clear="handleClear"
    />
    <main class="flex-1 overflow-hidden">
      <div
        id="scrollRef"
        ref="scrollRef"
        class="h-full overflow-hidden overflow-y-auto"
      >
        <div
          id="image-wrapper"
          class="w-full max-w-screen-xl m-auto dark:bg-[#101014]"
          :class="[isMobile ? 'p-2' : 'p-4']"
        >
          <template v-if="!dataSources.length">
            <div
              class="flex items-center flex-col justify-center mt-4 text-center"
            >
              <NImageGroup>
                <NSpace align="center" justify="center" />
              </NImageGroup>
            </div>
          </template>
          <template v-else>
            <Message
              v-for="(item, index) of dataSources"
              :key="index"
              :date-time="item.dateTime"
              :text="item.text"
              :inversion="item.inversion"
              :error="item.error"
              :loading="item.loading"
              @regenerate="onRegenerate(index)"
              @delete="handleDelete(index)"
            />
            <div class="sticky bottom-0 left-0 flex justify-center">
              <NButton v-if="loading" type="warning" @click="handleStop">
                <template #icon>
                  <SvgIcon icon="ri:stop-circle-line" />
                </template>
                {{ t("common.stopResponding") }}
              </NButton>
            </div>
          </template>
        </div>
      </div>
    </main>
    <footer :class="footerClass">
      <div class="flex items-center justify-between space-x-2">
        <HoverButton
          :tooltip="
            getEnabledNetwork
              ? '点击关闭联网功能，关闭联网能极大加快响应速度'
              : '点击开启联网功能，开启后会自动从互联网获得信息来回答您'
          "
        >
          <!-- <span class="text-xl text-[#4f555e]" @click="handleClear">
              <span style="color: #2979ff; width: 20px; display: inline-block;" v-if="getEnabledNetwork">联网开启</span>
              <span style="color: red; width: 20px; display: inline-block;" v-if="!getEnabledNetwork">联网关闭</span>
            </span> -->
          <!-- <n-switch v-model:value="getEnabledNetwork" @update:value="handleToggleNetwork" /> -->
          <SvgIcon
            :style="getEnabledNetwork ? { color: 'rgba(3, 34, 81, 1)' } : ''"
            class="text-lg"
            icon="zondicons:network"
            @click="handleToggleNetwork"
          />
        </HoverButton>
        <NAutoComplete
          v-model:value="prompt"
          :options="searchOptions"
          :render-label="renderOption"
        >
          <template #default="{ handleInput, handleBlur, handleFocus }">
            <NInput
              style="border-radius: 20px"
              ref="inputRef"
              v-model:value="prompt"
              type="textarea"
              :placeholder="t('inputPlaceholder')"
              :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
              @keypress="handleEnter"
            />
          </template>
        </NAutoComplete>
        <HoverButton v-if="!isMobile" @click="handleExport">
          <span class="text-xl text-[#4f555e] dark:text-white">
            <SvgIcon icon="ri:download-2-line" />
          </span>
        </HoverButton>

        <HoverButton v-if="!isMobile" @click="toggleUsingContext">
          <span
            class="text-xl"
            :class="{
              'text-[#4f555e]': usingContext,
              'text-[#E44446FF]': !usingContext,
            }"
          >
            <SvgIcon icon="ri:chat-history-line" />
          </span>
        </HoverButton>

        <NButton
          style="background: rgba(3, 34, 81, 1)"
          :disabled="buttonDisabled"
          @click="handleSubmit()"
        >
          <template #icon>
            <span style="color: #ffffff">
              <SvgIcon icon="ri:send-plane-fill" />
            </span>
          </template>
        </NButton>
      </div>
    </footer>
  </div>
</template>
