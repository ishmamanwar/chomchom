import uuid


class Appointment:
    def __init__(self, date: str, time: str, pet_id: str, id: str = None):
        self.id = id or str(uuid.uuid4())
        self.date = date
        self.time = time
        self.pet_id = pet_id

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time,
            "pet_id": self.pet_id
        }


class Vaccination:
    def __init__(self, name: str, date: str, pet_id: str, id: str = None):
        self.id = id or str(uuid.uuid4())
        self.name = name
        self.date = date
        self.pet_id = pet_id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "pet_id": self.pet_id
        }