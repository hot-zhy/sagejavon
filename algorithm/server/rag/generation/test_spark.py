
from sparkai.llm.llm import ChatSparkLLM, ChunkPrintHandler
from sparkai.core.messages import ChatMessage

# 注意 替换为自己的接口认证信息
SPARKAI_APP_ID = 'your sparkai app id'
SPARKAI_API_SECRET = 'your sparkai api secret'
SPARKAI_API_KEY = 'your sparkai api key'

model = 'spark lite'
if model == 'spark lite':
    SPARKAI_URL = 'wss://spark-api.xf-yun.com/v1.1/chat'
    SPARKAI_DOMAIN = 'general'
elif model == 'spark pro':
    SPARKAI_URL = 'wss://spark-api.xf-yun.com/v3.1/chat'
    SPARKAI_DOMAIN = 'generalv3'
elif model == 'spark max':
    SPARKAI_URL = 'wss://spark-api.xf-yun.com/v3.5/chat'
    SPARKAI_DOMAIN = 'generalv3.5'

spark = ChatSparkLLM(
    spark_api_url=SPARKAI_URL,
    spark_app_id=SPARKAI_APP_ID,
    spark_api_key=SPARKAI_API_KEY,
    spark_api_secret=SPARKAI_API_SECRET,
    spark_llm_domain=SPARKAI_DOMAIN,
    streaming=False,
)

if __name__ == '__main__':
    messages = [
        ChatMessage(role="user", content='什么是java'),
    ]
    handler = ChunkPrintHandler()
    a = spark.generate([messages], callbacks=[handler])
    print(a)
