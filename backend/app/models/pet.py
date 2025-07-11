from uuid import uuid4

class Pet:
    def __init__(self, name: str, pet_type: str, birth_date: str, image_url: str = ""):
        self.id = str(uuid4())
        self.name = name
        self.type = pet_type
        self.birthDate = birth_date
        self.imageUrl = image_url

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "birthDate": self.birthDate,
            "imageUrl": self.imageUrl,
        }