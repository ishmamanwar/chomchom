import uuid


class Appointment:
    def __init__(self, date: str, time: str, id: str = None):
        self.id = id or str(uuid.uuid4())
        self.date = date
        self.time = time

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time
        }


class Vaccination:
    def __init__(self, name: str, date: str, id: str = None):
        self.id = id or str(uuid.uuid4())
        self.name = name
        self.date = date

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date
        }