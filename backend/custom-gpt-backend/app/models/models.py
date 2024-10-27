from sqlalchemy import Column, Integer, String, JSON
from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    config = Column(JSON)

class WhiteLabelConfig(Base):
    __tablename__ = "white_label_configs"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, index=True)
    theme = Column(JSON)
    branding = Column(JSON)
