from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Category schemas
class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        orm_mode = True

# Post schemas
class PostBase(BaseModel):
    title: str
    content: str
    category_id: int

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category_id: Optional[int] = None

class Post(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: User
    category: Category
    
    class Config:
        orm_mode = True

# Comment schemas
class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    author_id: int
    post_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: User
    
    class Config:
        orm_mode = True

# Extended Post schema with comments
class PostWithComments(Post):
    comments: List[Comment] = []
    
    class Config:
        orm_mode = True
