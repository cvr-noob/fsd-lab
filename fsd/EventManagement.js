const EventEmitter = require("events");

class EventManagement extends EventEmitter {
    constructor() {
        super();
        this.startTimes = new Map();
    }

    startEvent(eventName) {
        const startTime = Date.now();
        this.startTimes.set(eventName, startTime);
        this.emit("start", { eventName, startTime });
    }

    progressEvent(eventName, progress) {
        this.emit("progress", { eventName, progress });
    }

    completeEvent(eventName) {
        const endTime = Date.now();
        const startTime = this.startTimes.get(eventName);
        if (!startTime) {
            console.error("Event not started");
            return;
        }

        const duration = endTime - startTime;
        this.emit("completed", {
            eventName,
            duration,
        });

        this.startTimes.delete(eventName);
    }
}

const obj = new EventManagement();

obj.on("start", (data) => console.log(`${data.eventName} started`));
obj.on("progress", (data) => console.log(`${data.eventName} in progress`));
obj.on("completed", (data) => console.log(`${data.eventName} completed`));

obj.startEvent("my event");
obj.progressEvent("my event");
obj.completeEvent("my event");
