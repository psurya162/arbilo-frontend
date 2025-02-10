
root@srv707936:/etc/nginx/sites-enabled# cat arbilo
server {
    listen 80;
    server_name arbilo.com www.arbilo.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/arbilo.com/fullchain.pem; # managed Certbot
    ssl_certificate_key /etc/letsencrypt/live/arbilo.com/privkey.pem; # managby Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.arbilo.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = arbilo.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name arbilo.com www.arbilo.com;
    return 404; # managed by Certbot




}


Username: phpmyadmin
Password: Alok@123

 this.host = 'arbilo.com';
        this.username = 'phpmyadmin';
        this.password = 'Alok@123';
        this.database = 'db_arbilo';







server {
    # HTTP server block - only handles redirects to HTTPS
    listen 80;
    server_name arbilo.com www.arbilo.com;
    return 301 https://$host$request_uri;
}

server {
    # HTTPS server block - handles all actual content
    listen 443 ssl;
    server_name arbilo.com www.arbilo.com;
    root /var/www/html;
    index index.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/arbilo.com/fullchain.pem; # managed Certbot
    ssl_certificate_key /etc/letsencrypt/live/arbilo.com/privkey.pem; # managby Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

    # Increase timeouts and buffer sizes
    proxy_connect_timeout 120s;
    proxy_send_timeout 120s;
    proxy_read_timeout 120s;
    send_timeout 120s;

    proxy_buffers 8 16k;
    proxy_buffer_size 32k;
    proxy_busy_buffers_size 64k;
    proxy_max_temp_file_size 128m;
}


   location /phpmyadmin {
    root /usr/share/;
    index index.php index.html index.htm;

    location ~ ^/phpmyadmin/(.+\.php)$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;  # Update if using a diffnt PHP version
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* ^/phpmyadmin/(.+\.(jpg|jpeg|gif|css|png|js|ico|html|xml|txt))
        root /usr/share/;
    }
}


    # Additional security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data:ob: 'unsafe-inline'" always;
}
root@srv707936:/etc/nginx/sites-enabled#
connectTimeout: 10000


CREATE USER 'phpmyadmin'@'localhost' IDENTIFIED BY 'Alok@123';
GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
