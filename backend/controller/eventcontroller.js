const Events = require("../model/eventmodel")

exports.createevent = async (req, res, next) => {
    try {
        const { title, description, date, color, time, category } = req.body;
        if (!title || !date || !color) {
            return next(new Error("Title, date, and color are required"))
        };
        const eventdetails = await Events.create({
            title,
            description,
            date,
            color,
            time: time || "",
            category: category || "Personal",
            user: req.user.id
        })
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            eventdetails
        })
    } catch (error) {
        next(error)
    }
}


//get events

exports.getevents = async (req, res, next) => {
    try {
        const events = await Events.find({ user: req.user.id })
        res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events
        })
    } catch (error) {
        next(error)
    }
}

//update event

exports.updateevent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, date, color, time, category } = req.body;

        const event = await Events.findById(id);
        if (!event) {
            return next(new Error("Event not found"))
        }

        if (event.user.toString() !== req.user.id) {
            return next(new Error("Unauthorized to update this event"))
        }

        const eventdetails = await Events.findByIdAndUpdate(
            id,
            {
                title,
                description,
                date,
                color,
                time: time || "",
                category: category || "Personal"
            },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            eventdetails
        })
    } catch (error) {
        next(error)
    }
}

//delete event

exports.deleteevent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Events.findById(id);
        if (!event) {
            return next(new Error("Event not found"))
        }

        if (event.user.toString() !== req.user.id) {
            return next(new Error("Unauthorized to delete this event"))
        }

        await Events.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

