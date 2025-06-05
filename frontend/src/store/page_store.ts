import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    previousPage: ''
  }),
  actions: {
    updatePage(currentPage: string) {
      if (this.previousPage) {
        this.previousPage = `${this.previousPage}.${currentPage}`;
      } else {
        this.previousPage = currentPage;
      }
    }
  }
})


export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [] as { eventName: string; tags: string }[]
  }),
  actions: {
    addEvent(eventName: string, tags: string) { // tags 是字符串
      this.events.push({ eventName, tags });
    },
    getEvents() {
      return this.events;
    },
    clearEvents() {
      this.events = [];
    }
  }
});