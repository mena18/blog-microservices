import pika, json,os,django




os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Blog.settings")
django.setup()

from articles.models import Article

params = pika.URLParameters('amqps://lxlpecrg:BQ8-2NPczihFdY5m-GZlrhLcdu68jbYq@rattlesnake.rmq.cloudamqp.com/lxlpecrg')

connection = pika.BlockingConnection(params)

channel = connection.channel()


channel.queue_declare(queue='blog')

def callback(ch, method, properties, body):
    article = None
    try:
        id = json.loads(body)
        print(id)
        id = int(id)
        article = Article.objects.get(id=id)
    except:
        print("article not found")
        return 

    action = properties.content_type

    if action == 'new_like':
        article.likes = article.likes + 1
        article.save()
    elif action == 'delete_like':
        article.likes = max(article.likes - 1,0)
        article.save()
    elif action == 'new_comment':
        article.num_comments = article.num_comments + 1
        article.save()
    elif action == 'delete_comment':
        article.num_comments = max(article.num_comments - 1,0)
        article.save()


channel.basic_consume(queue='blog', on_message_callback=callback,auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()