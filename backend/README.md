
## Description
## Đặc tả chức năng trong đề bài : 
- POST trang đăng ký : /auth/register
- POST trang đăng nhập : /auth/login
### Trang chủ
- GET danh sách ảnh về : /image?page=1
- GET tìm kiếm danh sách ảnh theo tên : /search/image?search=an&page=1
### Trang chi tiết 
- GET thông tin ảnh và người tạo ảnh bằng id ảnh : /image/:id
- GET thông tin bình luận theo id ảnh : /image/:id/comment?page=1
- GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)  ( require token ) : /image/:id/interact
- POST để lưu thông tin bình luận của người dùng với hình ảnh ( require token ) : /image/:id/comment
### Trang quản lý ảnh 
- GET thông tin user : user/:id
- GET danh sách ảnh đã lưu theo user id : /user/:id/image/save?page=1
- GET danh sách ảnh đã tạo theo user id : /user/:id/image/created?page=1
- DELETE xóa ảnh đã tạo theo id ảnh : /image/:id
### Trang thêm ảnh 
- POST thêm một ảnh của user : /image/upload
- PUT thông tin cá nhân của user : /user

## More in Swagger


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

