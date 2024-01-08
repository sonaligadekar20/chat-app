import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    message: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
)
const Message = model('message', messageSchema);
export default Message;