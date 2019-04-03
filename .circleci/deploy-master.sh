#!/usr/bin/env bash

user=root
host=$1
port=$2

src=`pwd`"/"
des=/home/wwwroot/alvinhtml/
now=`date +"%Y-%m-%d %H:%M:%S"`

echo "将 $src 目录下的文件同步到 $host:$des 目录下"

rsync -vzrc -e "ssh -p $port" --delete \
--exclude ".git" \
--exclude "build" \
--exclude "node_modules" \
--exclude ".env" \
--exclude ".circleci" \
--exclude ".manual" \
--exclude "frontent" \
$src $user@$host:$des

ssh -p $port $user@$host "sudo chown -R www:www $des"

ssh -p $port $user@$host "chmod -R 775 $des/bootstrap/cache && chmod -R 775 $des/storage && cd $des && pwd && ls -al"

ssh -p $port $user@$host php artisan config:cache
ssh -p $port $user@$host php artisan route:cache


echo "$now update $host $des code"
