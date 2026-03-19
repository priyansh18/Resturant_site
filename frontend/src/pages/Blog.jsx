import { useState, useEffect } from 'react';
import api from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ user: '', content: '' });

  useEffect(() => {
    api.get('/api/posts').then(setPosts).catch(() => {});
  }, []);

  const openPost = async (post) => {
    setSelected(post);
    try {
      const data = await api.get(`/api/posts/${post.id}/comments`);
      setComments(Array.isArray(data) ? data : []);
    } catch { setComments([]); }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/posts/${selected.id}/comments`, commentForm);
      setCommentForm({ user: '', content: '' });
      const data = await api.get(`/api/posts/${selected.id}/comments`);
      setComments(Array.isArray(data) ? data : []);
    } catch { alert('Failed to post comment'); }
  };

  const placeholder = [
    { id: 1, title: 'The Art of Plating: Making Food Beautiful', content: 'Presentation is half the meal. Learn how our chefs transform simple dishes into visual masterpieces that delight the eyes before the palate.', author: 'Chef Marco', created: '2025-12-15T10:00:00Z', tags: 'cooking,tips', image: '/images/blog1.jpg' },
    { id: 2, title: 'Farm to Table: Our Sourcing Philosophy', content: 'We believe great food starts with great ingredients. Discover how we partner with local farms to bring you the freshest produce.', author: 'Chef Priya', created: '2025-12-10T10:00:00Z', tags: 'sustainability,fresh', image: '/images/blog2.jpg' },
    { id: 3, title: 'Behind the Scenes: A Day in Our Kitchen', content: 'From early morning prep to the dinner rush, take a peek behind the curtain at what goes into running a world-class kitchen.', author: 'Chef Akira', created: '2025-12-05T10:00:00Z', tags: 'kitchen,team', image: '/images/blog3.jpg' },
  ];

  const items = posts.length > 0 ? posts : placeholder;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <p className="section-sub">Stories</p>
          <h1>Our <span className="gold">Blog</span></h1>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          {!selected ? (
            <div className="blog-grid">
              {items.map(post => (
                <div className="blog-card" key={post.id} onClick={() => openPost(post)}>
                  <div className="blog-card__img" style={{backgroundImage: post.image ? `url(${post.image})` : 'none'}} />
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>{post.author}</span>
                      <span>{new Date(post.created).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.content?.substring(0, 120)}...</p>
                    {post.tags && (
                      <div className="blog-card__tags">
                        {post.tags.split(',').map(t => <span key={t} className="tag">{t.trim()}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="blog-detail">
              <button className="btn btn--outline" onClick={() => setSelected(null)}>&larr; Back to Blog</button>
              <article className="blog-article">
                <div className="blog-article__meta">
                  <span>{selected.author}</span>
                  <span>{new Date(selected.created).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1>{selected.title}</h1>
                <div className="blog-article__content">{selected.content}</div>
              </article>

              <div className="comments-section">
                <h3>Comments ({comments.length})</h3>
                {comments.map(c => (
                  <div className="comment" key={c.id}>
                    <div className="comment__header">
                      <strong>{c.user}</strong>
                      <span>{new Date(c.created).toLocaleDateString()}</span>
                    </div>
                    <p>{c.content}</p>
                  </div>
                ))}
                <form className="comment-form" onSubmit={submitComment}>
                  <input type="text" placeholder="Your name" required value={commentForm.user} onChange={e => setCommentForm(p => ({...p, user: e.target.value}))} />
                  <textarea placeholder="Write a comment..." rows="3" required value={commentForm.content} onChange={e => setCommentForm(p => ({...p, content: e.target.value}))} />
                  <button type="submit" className="btn btn--gold">Post Comment</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
