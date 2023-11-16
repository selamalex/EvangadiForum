import React from 'react';


import { CgProfile } from "react-icons/cg";
import { FaGreaterThan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


import './question.css';

function QuestionDetail({question}) {
  const navigate = useNavigate()
  const handleclick = ()=>{
    navigate("/answer")
  }

  return (
    <div className='header_question'>
      <div className='question_user'>
        <CgProfile className='profile'/>
        <div className='username'>{question?.username}</div>
      </div>

      <div className='question_title' onClick={handleclick}>
      <div className='question_conten'>{question?.title}</div>
      <div className='question_arrow '>
        <div>{question?.questionid}</div>
        < FaGreaterThan/>
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail