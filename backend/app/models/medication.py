import uuid

class Medication:
    def __init__(self, pet_id, time, med, quantity, id=None):
        self.id = id or str(uuid.uuid4())
        self.pet_id = pet_id
        self.time = time
        self.med = med
        self.quantity = quantity

    def to_dict(self):
        return {
            "id": self.id,
            "pet_id": self.pet_id,
            "time": self.time,
            "med": self.med,
            "quantity": self.quantity,
        }