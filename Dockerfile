# Use an official Python runtime as a parent image
FROM ubuntu:16.10

# update system
RUN apt update

# install nginx
RUN apt-get install -y curl nginx

# Set the working directory to /app
WORKDIR /var/www/angular

# Copy the current directory contents into the container at /app
ADD ./dist/ /var/www/angular

# Make port 80 available to the world outside this container
EXPOSE 80

CMD /bin/bash

# docker run -i -t -v ~/development/javascript/angular/my-dream-app/dist:/var/www/html -p 80:80 --name nginx ubuntu:16.10 /bin/bash
