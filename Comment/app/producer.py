import pika, json

params = pika.URLParameters('amqps://lxlpecrg:BQ8-2NPczihFdY5m-GZlrhLcdu68jbYq@rattlesnake.rmq.cloudamqp.com/lxlpecrg')


def publish(method,body):
    properties = pika.BasicProperties(method)
    connection = pika.BlockingConnection(params)

    channel = connection.channel()
    
    channel.basic_publish(exchange='', routing_key='comment', body=json.dumps(body),properties=properties)
    print("send")
    connection.close()