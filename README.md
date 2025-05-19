```m
(/)
## Области хранения данных:

- база данных на json-server
- BFF
- редакс стор

## Сущности приложения:

- пользователь: БД (список пользователей), BFF (сессия текущего пользователя), стор (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
- статья: БД (список статей), стор (отображение в браузере)
- комментарии к статьям: БД (список комментариев),

## Таблицы БД:

- Пользователи - users: id / login/ password / registred at / role_id
- Роли - roles: id / name
- Статья - posts: id / title / image_url / content / published_at
- Комментарии - comments: id / author_id / post_id / content

## Схема состояния на BFF:

- Сессия текущего пользователя: login / password / role

## Схема для редакст стора (на клиенте):

- user: id/ login/ roleId/ session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
```
