#!/usr/bin/python3
""" holds class Email"""

import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5


class Email(BaseModel, Base):
    """Representation of a email """
    __tablename__ = 'emails'
    email = Column(String(128), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
