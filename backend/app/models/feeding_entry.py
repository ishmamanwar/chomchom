import uuid

class FeedingEntry:
    def __init__(self, pet_id, time, food, quantity, id=None):
        self.id = id or str(uuid.uuid4())
        self.pet_id = pet_id
        self.time = time
        self.food = food
        self.quantity = quantity

    def to_dict(self):
        return {
            "id": self.id,
            "pet_id": self.pet_id,
            "time": self.time,
            "food": self.food,
            "quantity": self.quantity,
        }