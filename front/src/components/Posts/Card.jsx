import axios from 'axios'
import Likes from '../Likes/Likes'
import { BiTimeFive } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'

const Card = ({
  createAt,
  userId,
  id,
  refetch,
  updatePost,
  likes,
  user,
  title,
  image,
  content,
}) => {
  //Gestion des dates/heures
  const takeDate = createAt.split('T')[0]

  const takeHour = createAt.split('T')[1].split('.')[0]

  const formatHourInput = (takeHour) => {
    const elem = takeHour.split(':')
    const hour = elem[0]
    const min = elem[1]
    const hourOk = hour + 'h' + min
    return hourOk
  }

  const formatDateInput = (takeDate) => {
    const elem = takeDate.split('-')
    const year = elem[0]
    const month = elem[1]
    const day = elem[2]

    const dateOk = day + '/' + month + '/' + year
    return dateOk
  }

  //Supprimer le post
  const handleDelete = async () => {
    const isConfirm = window.confirm('Êtes-vous sûrs de supprimer le post ?')
    if (!isConfirm) {
      return
    }
    await axios.delete(`http://localhost:4200/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    refetch()
  }

  //Modifier le post
  const handleModify = async () => {
    const isConfirm = window.confirm('Êtes-vous sûrs de modifier le post ?')
    if (!isConfirm) {
      return
    }
    const data = {
      title,
      content,
      userId,
      image,
      id,
    }
    updatePost(data)
  }

  return (
    <>
      <li className="card" key={id}>
        <div className="info">
          <img src={user.profile.image} alt="" />
          <div className="username_btnDelete">
            <p className="username">{user.username}</p>
            {localStorage.getItem('userId') === userId ||
            localStorage.getItem('isAdmin') === 'true' ? (
              <p className="delete-button" onClick={handleDelete}>
                <BsFillTrashFill />
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="username_btnModif">
            {localStorage.getItem('userId') === userId ||
            localStorage.getItem('isAdmin') === 'true' ? (
              <p className="modif-button" onClick={handleModify}>
                <AiFillSetting />
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="post_content">
          <h2>{title}</h2>
          <p className="content">{content}</p>
          <img src={image} alt="" />
          <div className="dateAndHour">
            <span>
              <BiTimeFive />
            </span>
            <p className="date">{formatDateInput(takeDate)}</p>
            <p className="hour">{formatHourInput(takeHour)}</p>
          </div>
        </div>
        {<Likes like={likes} id={id} userId={userId} />}
      </li>
    </>
  )
}

export default Card
