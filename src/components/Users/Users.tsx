import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card, Image, Pagination } from 'semantic-ui-react'
import { UserType } from '../../types/types'

type PropsType = {
    users: Array<UserType>
    currentPage: number
    totalCount: number
    pageSize: number
    followUnfollow: (id: number, followed: boolean) => void
    setCurrentPage: (e: any, pageInfo: any) => void
    isFollowProgress: Array<number>
}

const Users: React.FC<PropsType> = ({
    users,
    currentPage,
    totalCount,
    pageSize,
    followUnfollow,
    setCurrentPage,
    isFollowProgress,
}: PropsType) => {
    const pagesCount = Math.ceil(totalCount / pageSize)
    return (
        <>
            <Pagination
                defaultActivePage={currentPage}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={pagesCount}
                onPageChange={setCurrentPage}
            />
            <Card.Group>
                {users.map((user) => {
                    return (
                        <Card fluid key={user.id}>
                            <Card.Content>
                                <NavLink to={`/profile/${user.id}`}>
                                    <Image
                                        floated="left"
                                        size="tiny"
                                        alt="avatar"
                                        src={
                                            user.photos.small ||
                                            'https://image.flaticon.com/icons/png/512/186/premium/186313.png'
                                        }
                                    />
                                </NavLink>
                                <Card.Header>{user.name}</Card.Header>
                                <Card.Meta>{(user.location && user.location.country) || 'country'}</Card.Meta>
                                <Card.Meta>{(user.location && user.location.city) || 'city'}</Card.Meta>
                                <Card.Description>{user.status || 'status'}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button
                                    toggle
                                    disabled={isFollowProgress.some((id) => id === user.id)}
                                    loading={isFollowProgress.some((id) => id === user.id)}
                                    active={user.followed ? true : false}
                                    onClick={() => followUnfollow(user.id, user.followed)}
                                >
                                    {user.followed ? 'unfollow' : 'follow'}
                                </Button>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </>
    )
}

export default Users
