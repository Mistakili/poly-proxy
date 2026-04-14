FROM alpine:3.18
RUN apk add --no-cache tinyproxy
RUN printf 'Port 8888\nListen 0.0.0.0\nTimeout 600\nLogLevel Error\nMaxClients 50\nDisableViaHeader Yes\nAllow 0.0.0.0/0\n' > /etc/tinyproxy/tinyproxy.conf
EXPOSE 8888
CMD ["tinyproxy", "-d"]
