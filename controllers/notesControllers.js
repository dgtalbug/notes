const Note = require('../models/notes');

exports.create = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({
            message:"empty"
        });
    }
    const note = new Note({
        title:req.body.title || 'Untitled Note',
        content: req.body.content
    });
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || 'Action could not be completed'
        });
    });
};

exports.findAll = (req,res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message:err.message || 'Action could not be completed'
        });
    });
};


exports.findOne = (req,res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(400).send({
                message:"No Notes found under the given "+req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        return res.status(500).send({
            message:"Error while trying to find the notes"+req.params.noteId
        });

    });
};


exports.update = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({
            message:"empty"
        });
    }
    Note.findByIdAndUpdate(req.params.noteId,{
        title:req.body.title || 'Untitled Note',
        content: req.body.content
    },{new:true})
    .then(note => {
        if(!note){
            return res.status(400).send({
                message:"No Notes found under the given "+req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        res.status(500).send({
            message:err.message || 'Action could not be completed'
        });
    });

};
exports.delete = (req,res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(400).send({
                message:"No Notes found under the given "+req.params.noteId
            });
        }
        res.send({"message":'Deleted'});
    }).catch(err => {
        res.status(500).send({
            message:err.message || 'Action could not be completed'
        });
    })
}
