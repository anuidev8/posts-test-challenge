
import React from 'react'
import { fireEvent, render,cleanup,screen,waitFor } from '@testing-library/react'

import AddPostForm from '../components/AddPostForm'
import { PostModelTypes } from '../models'

const dataTest:PostModelTypes = {
    title:"Test new post",
    body: "This a Test about  new post :)",
    id:1,
    userId:2
  }

describe('Add post form component',()=>{
    const mockSubmit = jest.fn()
    it("should render the elements that contain the create form post",()=>{
        const elements = [
            {role:'form',id:'form'},
            {role:'input',id:'title'},
            {role:'input',id:'body'},
            {role:'button',id:'submit-button'},
         
        ]
    render(<AddPostForm handleSubmitEvent={ mockSubmit} />)
        elements.forEach((element=>{
            expect(screen.getByTestId(`${element.id}`)).toBeTruthy()
        }))

        
    });
   it("should return the  values of form", async()=>{
       
     render(<AddPostForm handleSubmitEvent={mockSubmit} />)
     fireEvent.change(screen.getByTestId("title"), {
        target: { value: "Test new post" }
      });
     fireEvent.change(screen.getByTestId("body"), {
        target: { value: "This a Test about  new post :)" }
      });

      fireEvent.submit(screen.getByTestId("submit-button"));

      await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith(dataTest)
    );
       /*  expect(mockSubmit).toHaveBeenCalled()
        expect(mockSubmit.mock.calls).toEqual([[JSON.stringify({email:'email@gmail.com',password:'12344'})]]) */
    }) 
    afterAll(cleanup)
})