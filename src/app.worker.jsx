// worker.js

export default () =>{
  self.addEventListener('message', e=>{
    if(!e) return;
    // console.log(e)
    let {users,type} = e.data;

    if(type === 'asc'){
      users = users.sort((a,b)=> a.commentCount - b.commentCount);
    }else if(type === 'desc'){
      users = users.sort((a,b)=> b.commentCount - a.commentCount);
    } else{
      users = users;
    }

    postMessage(users)

  })
}