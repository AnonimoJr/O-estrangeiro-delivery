
FROM node:18
WORKDIR /app
COPY . .
RUN echo "placeholder build"
CMD ["bash", "-c", "echo App rodando"]
