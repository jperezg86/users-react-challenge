import { useEffect, useState } from "react"; 
import {
  Button,
  Container,
  Grid,
  Title,
  UserImage,
  UserInfo,
} from "./components";

import { reqResApi } from "./api/reqRes";
import { current } from "immer";

const mockData = {
  id: 1,
  email: "george.bluth@reqres.in",
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://reqres.in/img/faces/1-image.jpg",
};

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      const {data} = await reqResApi.get('users?per_page=4',{
        params: {
          page : currentPage
        }
      });
      if(data.data.length > 0) {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      }else {
        alert("No more users"); 
      }
  };

  return (
    <>
      <Container>
        <Title>Our Team</Title>
        <Grid>  
          {
            users.map((user)=> 
              <div className='flex-column items-center' key={user.id}>
                <UserImage url={user.avatar} alt={user.first_name} />
                <UserInfo
                    fullName={`${user.first_name} ${user.last_name}`}
                    email={user.email}
                />
            </div>

            )
          }
        </Grid>

        <div className="flex space-around mt-40">
          <Button
            className="btn btn-sm"
            btnType="primary"
            type="button"
            onClick={ () => {
              setCurrentPage(currentPage-1)
              fetchUsers();
            }
          }
          >
            Prev users
          </Button>

          <Button
            className="btn btn-sm"
            btnType="primary"
            type="button"
            onClick={() => {
              setCurrentPage(currentPage+1)
              fetchUsers();
              }
            }
          >
            Next users
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;
