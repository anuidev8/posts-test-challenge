

import {  render,cleanup,screen,waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import ListPosts from '../components/ListPosts'



describe('Add post form component',()=>{
    
    it('should render the elements that contain the create posts list in async way',async()=>{


    const mockEditSubmit = jest.fn()
    const mockDeleteSubmit = jest.fn()

     render(<ListPosts  deleteHandlePost={ mockDeleteSubmit} editHandlePost={mockEditSubmit} />);
     await waitFor(() => {
        screen.getByTestId('list-container')
        expect( screen.getByTestId('list-container')).toBeInTheDocument()
         const ListElement = [
            {role:'title',id:'title'},
            {role:'body',id:'body'},
            {role:'edit-button',id:'edit-button'},
            {role:'deleted-button',id:'deleted-button'},
            
            
        ]
        ListElement.forEach((element=>{
            expect(screen.getByTestId(`${element.id}`)).toBeTruthy()
        })) 
     });

       

    })
    afterAll(cleanup)
})