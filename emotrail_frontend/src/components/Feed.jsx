import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import {searchQuery} from '../utils/data';
;




function Feed(){
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();
  useEffect(() => {
    setLoading(true)
 if(categoryId){
  const query = searchQuery(categoryId);
  client.fetch(query).then((data)=>{
    setPins(data);
  })
 } else{

 }
  }, [categoryId]);
  
  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>
  return (<div>Feed</div>)
};

export default Feed;
