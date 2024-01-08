import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    message: String,
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