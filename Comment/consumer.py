import pika, json,os,django




os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Comment.settings")
django.setup()

from app.models import Articles

params = pika.URLParameters('amqps://lxlpecrg:BQ8-2NPczihFdY5m-GZlrhLcdu68jbYq@rattlesnake.rmq.cloudamqp.com/lxlpecrg')

connection = pika.BlockingConnection(params)

channel = connection.channel()


channel.queue_declare(queue='blog')

def callback(ch, method, properties, body):
    id = None
    try:
        id = json.loads(body)
        id = int(id)
        action = properties.content_type

        if action == 'add_article':
            Articles.objects.create(id=id)
        elif action == 'delete_article':
            Articles.objects.filter(id=id).delete()
    except:
        print("Error happen")
        return 

    
    


channel.basic_consume(queue='blog', on_message_callback=callback,auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()