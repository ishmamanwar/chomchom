import uuid
from dataclasses import dataclass, asdict

@dataclass
class FeedingEntry:
    id: str
    pet_id: str
    time: str
    food: str
    quantity: str

    def to_dict(self):
        return asdict(self)

    @staticmethod
    def from_dict(data):
        return FeedingEntry(
            id=data.get("id") or str(uuid.uuid4()),
            pet_id=data["pet_id"],
            time=data["time"],
            food=data["food"],
            quantity=data["quantity"],
        )