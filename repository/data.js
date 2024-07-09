import { getDb, closeDb } from "../db/mongodb.js";
import { load } from "../data/load.js";
import { ObjectId } from "mongodb";

const add = async (data, type) => {
    try {
        const db = await getDb();
        let result;
        switch (type) {
            case 'matches':
                result = await db.collection('matches').insertOne(data);
                await load('matches')
                break;
            case 'links':
                result = await db.collection('links').insertOne(data);
                await load('links')
                break;
            case 'channels':
                result = await db.collection('channels').insertOne(data);
                await load('channels')
                break;
            case 'leagues':
                result = await db.collection('leagues').insertOne(data);
                await load('leagues')
                break;
            default:
                throw new Error("Collections not exist.")
        }
        return result
    } catch (err) {
        throw err
    } finally {
        await closeDb()
    }
}


const update = async (id, data, type) => {
    try {
        const db = await getDb();
        let result;
        switch (type) {
            case 'matches':
                result = await db.collection('matches').updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $set: data },
                );
                await load('matches')
                break;
            case 'links':
                result = await db.collection('links').updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $set: data },
                );
                await load('links')
                break;
            case 'channels':
                result = await db.collection('channels').updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $set: data },
                );
                await load('channels')
                break;
            case 'leagues':
                const team = data.teams;

                if (team) {
                    const teamId = team.id;

                    if (teamId) {
                        const updateFields = Object.keys(team).reduce((fields, key) => {
                            if (key !== 'id') {
                                fields[`teams.$.${key}`] = team[key];
                            }
                            return fields;
                        }, {});

                        result = await db.collection('leagues').updateOne(
                            {
                                _id: ObjectId.createFromHexString(id),
                                "teams.id": ObjectId.createFromHexString(teamId)
                            },
                            { $set: updateFields },
                        );
                    } else {
                        team.id = new ObjectId();
                        result = await db.collection('leagues').updateOne(
                            { _id: ObjectId.createFromHexString(id) },
                            { $push: { teams: team } },
                        );
                    }
                } else {
                    result = await db.collection('leagues').updateOne(
                        { _id: ObjectId.createFromHexString(id) },
                        { $set: data },
                    );
                }

                await load('leagues')
                break;
        }
        return result
    } catch (err) {
        throw err
    } finally {
        await closeDb()
    }
}

const remove = async (id, secId, type) => {
    try {
        const db = await getDb();
        let result;
        switch (type) {
            case 'matches':
                result = await db.collection('matches').deleteOne({ _id: ObjectId.createFromHexString(id) });
                await db.collection("links").deleteMany({matchId: id})
                await load('matches')
                break;
            case 'links':
                result = await db.collection('links').deleteOne({ _id: ObjectId.createFromHexString(id) });
                await load('links')
                break;
            case 'channels':
                result = await db.collection('channels').deleteOne({ _id: ObjectId.createFromHexString(id) });
                await load('channels')
                break;
            case 'leagues':
                if (secId === null) {
                    result = await db.collection('leagues').deleteOne({ _id: ObjectId.createFromHexString(id) });

                } else {
                    result = await db.collection('leagues').updateOne(
                        { _id: ObjectId.createFromHexString(id) },
                        { $pull: { teams: { id: ObjectId.createFromHexString(secId) } } }
                    );
                }
                await load('leagues')
                break;
        }
        return result
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        await closeDb()
    }
}

export { add, update, remove }