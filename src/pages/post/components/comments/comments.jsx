import { useState } from 'react';
import styled from 'styled-components';
import { Comment } from './components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import PropTypes from 'prop-types';

const CommentsContainer = ({ className, comments, postId }) => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const [newComment, setNewComment] = useState('');
    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(requestServer, userId, postId, content));
        setNewComment('');
    };

    const isGuest = userRole === ROLE.GUEST;

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                    <textarea
                        name="comment"
                        value={newComment}
                        placeholder="Комментарий..."
                        onChange={({ target }) => setNewComment(target.value)}
                    ></textarea>
                    <Icon
                        id="fa-paper-plane-o"
                        margin="0 0 0 10px"
                        size="18px"
                        onClick={() => onNewCommentAdd(userId, postId, newComment)}
                    />
                </div>
            )}
            <div className="comments">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        postId={postId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    width: 580px;
    margin: 0 auto;

    & .new-comment {
        display: flex;
        width: 100%;
        margin: 20px 0 0px;
    }

    & .new-comment textarea {
        width: 550px;
        height: 120px;
        font-size: 18px;
        resize: none;
    }
`;

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
    postId: PropTypes.string.isRequired,
};
