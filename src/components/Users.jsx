import React from 'react'

const Users = ({users}) => {
  // console.log(users)
  return (
<>
{
   users.map((user,index)=>{
    return (
              
               <div className="card mt-4 mb-4" key={index}>
              <div className="card-header">
        {user.name}
      </div><div className="card-body">
          <h5 className="card-title">{user.email}</h5>
          <p className="card-text">{user.joinedOn.toString()}</p>
        </div><div className="card-footer text-muted">
          {user.commentCount} Comments
        </div>
        </div>
        
    )
   })
}

</>

    )
}

export default Users