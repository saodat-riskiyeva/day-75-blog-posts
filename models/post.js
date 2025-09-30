const mongodb = require("mongodb");
const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    // this.createdAt = new Date();
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  async save() {
    let result;

    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          {
            $set: {
              title: this.title,
              content: this.content,
            },
          }
        );
    } else {
      result = await db.getDb().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });
    }

    return result;
  }

  async delete() {
    if (!this.id) {
      throw new Error("Post ID is required for deletion.");
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });

    return result;
  }
}

module.exports = Post;
