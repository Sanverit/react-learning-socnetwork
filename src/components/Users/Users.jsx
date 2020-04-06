import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Pagination } from 'semantic-ui-react'

function Users(props) {
    const {users, currentPage, totalCount, pageSize, followUnfollow, setCurrPage, isFollowProgress} = props;
    let pagesCount = Math.ceil(totalCount/pageSize);
    return (
        <>
            <Pagination
                defaultActivePage={currentPage}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={pagesCount}
                onPageChange={setCurrPage}
            />
            <Card.Group>
                {
                    users.map((user) => {
                        return (
                            <Card fluid key={user.id}>
                                <Card.Content>
                                    <NavLink to={`/profile/${user.id}`}>
                                        <Image
                                            floated='left'
                                            size='tiny'
                                            alt='avatar'
                                            src={user.photos.small || 'https://image.flaticon.com/icons/png/512/186/premium/186313.png'}
                                        />
                                    </NavLink>
                                    <Card.Header>{user.name}</Card.Header>
                                    <Card.Meta>{(user.location && user.location.country) || 'country'}</Card.Meta>
                                    <Card.Meta>{(user.location && user.location.city) || 'city'}</Card.Meta>
                                    <Card.Description>
                                        {user.status || 'status'}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button 
                                        toggle
                                        disabled={isFollowProgress.some( id => id===user.id )}
                                        loading={isFollowProgress.some( id => id===user.id )}
                                        active={user.followed ? true : false} 
                                        onClick={() => followUnfollow(user.id, user.followed)}
                                    >
                                        {user.followed ? 'unfollow' : 'follow'}
                                    </Button>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
            </Card.Group>
        </>
    )
}

export default Users