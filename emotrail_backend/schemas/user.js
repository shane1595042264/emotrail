export default {
    name: 'user',
    title: 'User',
    type:'document',
    fields:[
        {
            name:"userName",
            title:"UserName",
            type:"string"
        },
        {
            name:'image',
            title: 'Image' ,
            type:'string'
        },
        {
            name:"admin",
            title:"Admin",
            type:"boolean",
            initialValue: false,
        },
        {
            name:"grade",
            title:"Grade",
            type:"string",
            initialValue: "somethingpls"
        }
    ],
}