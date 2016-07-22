import express from 'express';
import graphqlHttp from 'express-graphql';
import {graphql} from 'graphql';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

let app = express();

let ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        bio: {type: GraphQLString},
        birthdate: {type: GraphQLString},
        movies: {type: MovieType}
    })
})

let MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        director: {type: GraphQLString},
        genre: {type: GraphQLString},
        language: {type: GraphQLString},
        description: {type: GraphQLString},
        actors: {type: ActorType},
        trailer: {type: GraphQLString}
    })
})

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            movies: {
                type: MovieType,
                description: 'Semua film yang ada di blitz',
                resolve: () => {
                    return [
                        {
                            id: 1,
                            title: 'Finding Dory',
                            director: 'Andrew Stanton',
                            genre: 'Animation',
                            language: 'English',
                            description: `
Enam bulan setelah cerita di Finding Nemo, Dory si ikan biru yang pelupa tiba-tiba mengingat sesuatu dari masa kecilnya. Ingatan ini memicunya untuk mencari ayah dan ibunya yang sudah lama terpisah darinya. Marlin dan Nemo pun ikut serta menemani Dory. Apa saja yang dialaminya di perjalanan, siapa saja makhluk laut yang ditemuinya, dan apakah sifatnya yang pelupa akan mengacaukan misi mereka?
Six months after the story in Finding Nemo, Dory the forgetful blue fish suddenly recalls something from her childhood memories. This urges her to go and find her long lost father and mother. Marlin and Nemo tag along in the adventure. What will she encounter along the way, which sea creatures will she meet, and will her forgetful nature turn their mission into another chaos?
                            `,
                            actors: [
                                {
                                    id: 1,
                                    name: 'Ellen DeGeneres',
                                    bio: 'lorem ipsum'
                                }
                            ],
                            trailer: 'https://www.youtube.com/watch?v=Q9rYchFMmlc'
                        }
                    ];
                }
            }
        })
    })
})


app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('graphql running on 3000');
});
