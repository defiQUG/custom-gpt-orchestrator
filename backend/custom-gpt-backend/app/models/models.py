from sqlalchemy import Column, Integer, String, JSON, CheckConstraint
from sqlalchemy.sql import text
from passlib.context import CryptContext
from ..core.database import Base

# Setup password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    salt = Column(String(32), nullable=False)
    role = Column(String(50), nullable=False)

    def set_password(self, password: str):
        self.salt = pwd_context.handler.generate_salt()
        self.hashed_password = pwd_context.hash(password + self.salt)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password + self.salt, self.hashed_password)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    type = Column(String(50), nullable=False)
    config = Column(JSON, nullable=False)

    __table_args__ = (
        CheckConstraint(
            text("json_typeof(config) = 'object'"),
            name="config_is_json_object"
        ),
    )

class WhiteLabelConfig(Base):
    __tablename__ = "white_label_configs"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, index=True, nullable=False)
    theme = Column(JSON, nullable=False)
    branding = Column(JSON, nullable=False)

    __table_args__ = (
        CheckConstraint(
            text("json_typeof(theme) = 'object'"),
            name="theme_is_json_object"
        ),
        CheckConstraint(
            text("json_typeof(branding) = 'object'"),
            name="branding_is_json_object"
        ),
    )
