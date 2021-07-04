import * as React from "react";
import styled from "styled-components";

import { STATUS, Task, Form, TASK_FORM_FIELDS, TEST_IDS } from "../typings/global";

import { Button } from "../ui/Button";

import { statusTranslation } from "../services/getStatusTranslation";
import { statusFlow } from "../services/getStatusFlow";

const getFormInitialState = (users: string[]) => ({
    [TASK_FORM_FIELDS.TITLE]: "",
    [TASK_FORM_FIELDS.DESCRIPTION]: "",
    [TASK_FORM_FIELDS.STATUS]: STATUS.TODO,
    [TASK_FORM_FIELDS.ASSIGNEE]: users[0],
})

interface Props {
    onSubmit: (form: Form) => void;
    editedTask: Task | null;
    users: string[];
}

/**
 * TaskForm is a component dedicated for task form only.
 */
const TaskForm = (props: Props): React.ReactElement | null => {
    const [form, setForm] = React.useState<Form>(() => getFormInitialState(props.users));

    React.useEffect(() => {
        if (props.editedTask?.id) {
            setForm({ ...props.editedTask });
        }
    }, [props.editedTask]);

    const requiredFieldsValidated = form[TASK_FORM_FIELDS.TITLE];

    const isFormValidated = props.editedTask
        ? requiredFieldsValidated && (
            props.editedTask.title !== form[TASK_FORM_FIELDS.TITLE] ||
            props.editedTask.description !== form[TASK_FORM_FIELDS.DESCRIPTION] ||
            props.editedTask.assignee !== form[TASK_FORM_FIELDS.ASSIGNEE] ||
            props.editedTask.status !== form[TASK_FORM_FIELDS.STATUS])
        : requiredFieldsValidated;

    const handleSubmit = () => props.onSubmit(form);

    return (
        <>
            <FormStyled onSubmit={handleSubmit}>
                <Label>
                    <h5>Title</h5>
                    <Input
                        type="text"
                        value={form[TASK_FORM_FIELDS.TITLE]}
                        onChange={event => setForm({ ...form, [TASK_FORM_FIELDS.TITLE]: event.target.value })}
                        autoFocus
                        data-testid={TEST_IDS.TASK_FORM_TITLE}
                    />
                </Label>
                <Label>
                    <h5>Description</h5>
                    <Textarea
                        value={form[TASK_FORM_FIELDS.DESCRIPTION]}
                        onChange={event => setForm({ ...form, [TASK_FORM_FIELDS.DESCRIPTION]: event.target.value })}
                    />
                </Label>
                <Label>
                    <h5>Assignee</h5>
                    <Select
                        value={form[TASK_FORM_FIELDS.ASSIGNEE]}
                        onChange={event => setForm({ ...form, [TASK_FORM_FIELDS.ASSIGNEE]: event.target.value })}
                    >
                        {props.users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </Select>
                </Label>

                {props.editedTask && (
                    <Label>
                        <h5>Status</h5>
                        <Select
                            value={form[TASK_FORM_FIELDS.STATUS]}
                            onChange={event => setForm({ ...form, [TASK_FORM_FIELDS.STATUS]: event.target.value as STATUS })}
                        >
                            {statusFlow[props.editedTask.status].map(status =>
                                <option key={status} value={status}>{statusTranslation[status]}</option>
                            )}
                        </Select>
                    </Label>
                )}
            </FormStyled>
            <Button disabled={!isFormValidated} onClick={handleSubmit}>Save</Button>
        </>
    )
}

export default TaskForm;

const FormStyled = styled.form`
    margin-bottom: ${props => props.theme.spaces.base};
`;

const Label = styled.label`
    width: 100%;
    margin-bottom: ${props => props.theme.spaces.base};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: ${props => props.theme.spaces.half};
`;

const Input = styled.input`
    width: 100%;
    padding: ${props => props.theme.spaces.half};
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    padding: ${props => props.theme.spaces.half};
`;
