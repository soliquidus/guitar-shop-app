FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_USER_PASSWORD root
ENV LANG=C.UTF-8
EXPOSE 3307
COPY init_db.sql /docker-entrypoint-initdb.d
