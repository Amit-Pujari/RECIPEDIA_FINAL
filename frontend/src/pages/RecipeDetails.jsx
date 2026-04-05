import React, { useState, useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import axios from 'axios'
import profileImg from '../assets/profile.png'

export default function RecipeDetails() {
    const recipe = useLoaderData()
    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [newReview, setNewReview] = useState('')

    useEffect(() => {
      setComments(recipe.comments || [])
    }, [recipe])

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!newReview.trim()) return
      try {
        const res = await axios.post(`http://localhost:5000/recipe/${id}/comments`, { text: newReview })
        setComments(res.data)
        setNewReview('')
      } catch (err) {
        console.error('Error adding review:', err)
      }
    }

    return (
   <>
    <div className='outer-container'>
        <div className='profile'>
            <img src={profileImg} width="50px" height="50px"></img>
            <h5>{recipe.createdBy?.username || recipe.createdBy?.name || recipe.createdBy?.email || 'Unknown'}</h5>
        </div>
        <h3 className='title'>{recipe.title}</h3>
        <img src={`http://localhost:5000/images/${recipe.coverImage}`} width="220px" height="200px"></img>
        <div className='recipe-details'>
            <div className='ingredients'>
              <h4 className="recipe-section-title">🍲 Ingredients</h4>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className='instructions'>
              <h4 className="recipe-section-title">📋 Instructions</h4>
              <div style={{lineHeight: '1.8'}}>
                {recipe.instructions.split('.').filter(s => s.trim()).map((sentence, index) => (
                  <p key={index} style={{marginBottom: '0.8rem'}}>{sentence.trim()}.</p>
                ))}
              </div>
            </div>
        </div>
        <div className='reviews-section'>
          <h4 className="recipe-section-title">⭐ Reviews ({comments.length})</h4>
          {comments.length === 0 ? (
            <p>No reviews yet. Be the first one!</p>
          ) : (
            comments.map((comment, index) => (
                <div key={comment._id || index} className='review' style={{ 
                  marginBottom: '20px', 
                  padding: '16px', 
                  borderLeft: '4px solid #3b82f6', 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                }}>
                  <div className='review-header' style={{ marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: '#1e293b', marginRight: '10px' }}>
                      {comment.user?.username || comment.user?.name || (comment.user?.email ? comment.user.email.split('@')[0] : 'Anonymous')}
                    </strong>
                    <span style={{ color: '#64748b' }}>
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#334155', lineHeight: 1.6 }}>{comment.text}</p>
                </div>
            ))
          )}
<form onSubmit={handleSubmit} className='new-review-form' style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here to help fellow foodies! 🍳✨"
              required
              maxLength={1000}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '14px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 4px rgba(16,185,129,0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
            <button 
              type="submit" 
              disabled={!newReview.trim()}
              style={{
                padding: '14px 28px',
                background: newReview.trim() ? 'linear-gradient(135deg, #10b981, #059669)' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: newReview.trim() ? 'pointer' : 'not-allowed',
                boxShadow: newReview.trim() ? '0 6px 20px rgba(16,185,129,0.4)' : 'none',
                transition: 'all 0.3s ease-in-out',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                if (newReview.trim()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(16,185,129,0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (newReview.trim()) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(16,185,129,0.4)';
                }
              }}
            >
              {newReview.trim() ? '🚀 Post Review' : 'Post Review'}
            </button>
          </form>
        </div>
    </div>
   </>
  )
}