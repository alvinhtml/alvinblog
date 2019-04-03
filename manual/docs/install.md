# Laravel 安装配置

## 安装

使用 composer 安装，执行以下命令，将创建一个名为 blog 的目录。

```bash
composer create-project --prefer-dist laravel/laravel blog
```

### 简单预览

如果你在本地安装了 PHP，并且想使用 PHP 内置的开发服务器来为你的应用程序提供服务，那就使用 Artisan 命令 serve。这个命令会在  localhost:8000 上启动开发服务器：

```bash
php artisan serve
```

## 配置

### Public 目录

安装 Laravel 之后，你要将 Web 服务器的根目录指向 public 目录。该目录下的 index.php 文件将作为所有进入应用程序的 HTTP 请求的前端控制器。

### 配置文件

Laravel 框架的所有配置文件都放在 config 目录中。每个选项都有注释，方便你随时查看文件并熟悉可用的选项。

### 目录权限

安装完 Laravel 后，你可能需要给这两个文件配置读写权限：storage 目录和 bootstrap/cache 目录应该允许 Web 服务器写入，否则 Laravel 将无法运行。如果你使用的是 Homestead 虚拟机，这些权限已经为你设置好了。

### 应用密钥

安装 Laravel 之后下一件应该做的事就是将应用程序的密钥设置为随机字符串。如果你是通过 Composer 或 Laravel 安装器安装的 Laravel，那这个密钥已经为你通过 php artisan key:generate 命令设置好了。

通常来说，这个字符串长度为 32 个字符。密钥可以在 .env 环境文件中设置。前提是你要将 .env.example 文件重命名为 .env。如果应用程序密钥没有被设置，就不能确保你的用户会话和其他加密数据的安全！


## 优化

线上环境执行
```bash
php artisan config:cache
php artisan route:cache
```

## open_basedir 配置
fastcgi_param PHP_ADMIN_VALUE "open_basedir=$document_root/:/tmp/:/proc/";
fastcgi_param PHP_ADMIN_VALUE "open_basedir=/home/wwwroot/:/tmp/:/proc/";
