# Usa a imagem oficial do PHP como base
FROM php:8.2-apache

# Instala as extensões de sistema necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala a extensão pdo_pgsql do PHP
RUN docker-php-ext-install pdo pdo_pgsql

# Habilita o módulo de reescrita do Apache, útil para URLs amigáveis
RUN a2enmod rewrite

# Copia os arquivos da sua aplicação para o diretório do Apache
COPY  . .