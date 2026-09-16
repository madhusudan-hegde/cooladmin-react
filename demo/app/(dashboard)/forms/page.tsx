import type { ReactNode } from 'react'
import { Footer, Input, PageHeader, Radio, Select, Textarea } from '@madhusudan-hegde/cooladmin-react'
import {
  ActionButtons,
  FormCard,
  FormCheck,
  GridInput,
  HRow,
  SubmitReset,
} from '@/components/forms-helpers'
import { CreditCardForm } from '@/components/forms-credit-card'
import { DemoForm } from '@/components/forms-demo-form'
import { ValidationStatesCard } from '@/components/forms-validation-card'

export const metadata = { title: 'Forms' }

const selectOptions = [
  { value: '0', label: 'Please select' },
  { value: '1', label: 'Option #1' },
  { value: '2', label: 'Option #2' },
  { value: '3', label: 'Option #3' },
]

const dropdownItems = ['Action', 'Another Action', 'Something else here']

/** Bootstrap dropdown inside an `.input-group` (Bootstrap JS drives the toggle; all attrs are static). */
function InputGroupDropdown({ label }: { label: string }) {
  return (
    <div className="input-group-btn">
      <div className="btn-group">
        <button
          type="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="dropdown-toggle btn btn-primary"
        >
          {label}
        </button>
        <div className="dropdown-menu">
          {dropdownItems.map(item => (
            <button type="button" className="dropdown-item" key={item}>
              {item}
            </button>
          ))}
          <div className="dropdown-divider" />
          <button type="button" className="dropdown-item">
            Separated link
          </button>
        </div>
      </div>
    </div>
  )
}

/** `.input-group-addon` (CoolAdmin's Bootstrap 3-era addon, restyled in _forms.scss). */
function Addon({ children }: { children: ReactNode }) {
  return <div className="input-group-addon">{children}</div>
}

/** CoolAdmin form.html — credit card, company, basic/inline/horizontal/normal forms, grids, sizes, validation, input groups. */
export default function FormsPage() {
  return (
    <>
      <PageHeader
        title="Forms"
        subtitle="Bootstrap 5 form components: inputs, selects, validation, and grouped controls."
      />

      <div className="row">
        {/* Credit card */}
        <div className="col-lg-6">
          <CreditCardForm />
        </div>

        {/* Company form */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Company</strong>
                <small> Form</small>
              </>
            }
          >
            <Input
              variant="bootstrap"
              id="company"
              label="Company"
              placeholder="Enter your company name"
            />
            <Input variant="bootstrap" id="vat" label="VAT" placeholder="DE1234567890" />
            <Input variant="bootstrap" id="street" label="Street" placeholder="Enter street name" />
            <div className="row form-group">
              <div className="col-6">
                <Input
                  variant="bootstrap"
                  id="city"
                  label="City"
                  placeholder="Enter your city"
                  wrapperClassName="mb-3"
                />
              </div>
              <div className="col-6">
                <Input
                  variant="bootstrap"
                  id="postal-code"
                  label="Postal Code"
                  placeholder="Postal Code"
                  wrapperClassName="mb-3"
                />
              </div>
            </div>
            <Input variant="bootstrap" id="country" label="Country" placeholder="Country name" />
          </FormCard>
        </div>

        {/* Basic form elements + Inline form */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Basic Form</strong> Elements
              </>
            }
            footer={<SubmitReset form="basic-form" />}
          >
            <DemoForm id="basic-form" className="form-horizontal">
              <HRow label="Static">
                <p className="form-control-plaintext">Username</p>
              </HRow>
              <HRow label="Text Input" htmlFor="text-input">
                <Input variant="bootstrap" id="text-input" name="text-input" placeholder="Text" />
                <small className="form-text text-muted">This is a help text</small>
              </HRow>
              <HRow label="Email Input" htmlFor="email-input">
                <Input
                  variant="bootstrap"
                  type="email"
                  id="email-input"
                  name="email-input"
                  placeholder="Enter Email"
                />
                <small className="form-text text-muted">Please enter your email</small>
              </HRow>
              <HRow label="Password" htmlFor="password-input">
                <Input
                  variant="bootstrap"
                  type="password"
                  id="password-input"
                  name="password-input"
                  placeholder="Password"
                />
                <small className="form-text text-muted">Please enter a complex password</small>
              </HRow>
              <HRow label="Disabled Input" htmlFor="disabled-input">
                <Input
                  variant="bootstrap"
                  id="disabled-input"
                  name="disabled-input"
                  placeholder="Disabled"
                  disabled
                />
              </HRow>
              <HRow label="Textarea" htmlFor="textarea-input">
                <Textarea
                  id="textarea-input"
                  name="textarea-input"
                  rows={9}
                  placeholder="Content..."
                />
              </HRow>
              <HRow label="Select" htmlFor="select">
                <Select id="select" name="select" options={selectOptions} defaultValue="0" />
              </HRow>
              <HRow label="Select Large" htmlFor="selectLg">
                <Select
                  id="selectLg"
                  name="selectLg"
                  className="form-select-lg"
                  options={selectOptions}
                  defaultValue="0"
                />
              </HRow>
              <HRow label="Select Small" htmlFor="selectSm">
                <Select
                  id="selectSm"
                  name="selectSm"
                  className="form-select-sm"
                  options={[
                    ...selectOptions,
                    { value: '4', label: 'Option #4' },
                    { value: '5', label: 'Option #5' },
                  ]}
                  defaultValue="0"
                />
              </HRow>
              <HRow label="Disabled Select" htmlFor="disabledSelect">
                <Select
                  id="disabledSelect"
                  name="disabledSelect"
                  options={selectOptions}
                  defaultValue="0"
                  disabled
                />
              </HRow>
              <HRow
                label="Multiple select"
                htmlFor="multiple-select"
                controlClassName="col col-md-9"
              >
                {/* Raw select: the library `Select` omits the native `size` attribute. */}
                <select
                  name="multiple-select"
                  id="multiple-select"
                  multiple
                  className="form-select"
                  size={6}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option value={String(i + 1)} key={i}>
                      Option #{i + 1}
                    </option>
                  ))}
                </select>
              </HRow>
              <HRow label="Radios" controlClassName="col col-md-9">
                {['Option 1', 'Option 2', 'Option 3'].map((label, i) => (
                  <Radio
                    key={label}
                    id={`radio${i + 1}`}
                    name="radios"
                    value={`option${i + 1}`}
                    label={label}
                    wrapperClassName="mb-2"
                  />
                ))}
              </HRow>
              <HRow label="Inline Radios" controlClassName="col col-md-9">
                {['One', 'Two', 'Three'].map((label, i) => (
                  <Radio
                    key={label}
                    id={`inline-radio${i + 1}`}
                    name="inline-radios"
                    value={`option${i + 1}`}
                    label={label}
                    inline
                  />
                ))}
              </HRow>
              <HRow label="Checkboxes" controlClassName="col col-md-9">
                {['Option 1', 'Option 2', 'Option 3'].map((label, i) => (
                  <FormCheck
                    key={label}
                    id={`checkbox${i + 1}`}
                    name={`checkbox${i + 1}`}
                    value={`option${i + 1}`}
                    label={label}
                    className="mb-2"
                  />
                ))}
              </HRow>
              <HRow label="Inline Checkboxes" controlClassName="col col-md-9">
                {['One', 'Two', 'Three'].map((label, i) => (
                  <FormCheck
                    key={label}
                    id={`inline-checkbox${i + 1}`}
                    name={`inline-checkbox${i + 1}`}
                    value={`option${i + 1}`}
                    label={label}
                    inline
                  />
                ))}
              </HRow>
              <HRow label="File input" htmlFor="file-input">
                <input type="file" id="file-input" name="file-input" className="form-control" />
              </HRow>
              <HRow label="Multiple File input" htmlFor="file-multiple-input">
                <input
                  type="file"
                  id="file-multiple-input"
                  name="file-multiple-input"
                  multiple
                  className="form-control"
                />
              </HRow>
            </DemoForm>
          </FormCard>

          <FormCard
            header={
              <>
                <strong>Inline</strong> Form
              </>
            }
            footer={<SubmitReset form="inline-form" />}
          >
            <DemoForm id="inline-form" className="row g-3">
              <div className="col-auto">
                <label htmlFor="exampleInputName2" className="visually-hidden">
                  Name
                </label>
                <Input variant="bootstrap" id="exampleInputName2" placeholder="Jane Doe" required />
              </div>
              <div className="col-auto">
                <label htmlFor="exampleInputEmail2" className="visually-hidden">
                  Email
                </label>
                <Input
                  variant="bootstrap"
                  type="email"
                  id="exampleInputEmail2"
                  placeholder="jane.doe@example.com"
                  required
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </DemoForm>
          </FormCard>
        </div>

        {/* Horizontal / Normal / Grid / Sizes */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Horizontal</strong> Form
              </>
            }
            footer={<SubmitReset form="horizontal-form" />}
          >
            <DemoForm id="horizontal-form" className="form-horizontal">
              <HRow label="Email" htmlFor="hf-email">
                <Input
                  variant="bootstrap"
                  type="email"
                  id="hf-email"
                  name="hf-email"
                  placeholder="Enter Email..."
                />
                <small className="form-text text-muted">Please enter your email</small>
              </HRow>
              <HRow label="Password" htmlFor="hf-password">
                <Input
                  variant="bootstrap"
                  type="password"
                  id="hf-password"
                  name="hf-password"
                  placeholder="Enter Password..."
                />
                <small className="form-text text-muted">Please enter your password</small>
              </HRow>
            </DemoForm>
          </FormCard>

          <FormCard
            header={
              <>
                <strong>Normal</strong> Form
              </>
            }
            footer={<SubmitReset form="normal-form" />}
          >
            <DemoForm id="normal-form">
              <div className="mb-3">
                <label htmlFor="nf-email" className="form-control-label">
                  Email
                </label>
                <Input
                  variant="bootstrap"
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  placeholder="Enter Email.."
                />
                <span className="help-block">Please enter your email</span>
              </div>
              <div className="mb-3">
                <label htmlFor="nf-password" className="form-control-label">
                  Password
                </label>
                <Input
                  variant="bootstrap"
                  type="password"
                  id="nf-password"
                  name="nf-password"
                  placeholder="Enter Password.."
                />
                <span className="help-block">Please enter your password</span>
              </div>
            </DemoForm>
          </FormCard>

          <FormCard
            header={
              <>
                Input <strong>Grid</strong>
              </>
            }
            footer={
              <SubmitReset form="grid-form" submitLabel="Login" submitIcon="fa-solid fa-user" />
            }
          >
            <DemoForm id="grid-form" className="form-horizontal">
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                <div className="row mb-3" key={n}>
                  <GridInput className={`col col-sm-${n}`} />
                </div>
              ))}
            </DemoForm>
          </FormCard>

          <FormCard
            header={
              <>
                Input <strong>Sizes</strong>
              </>
            }
            footer={<SubmitReset form="sizes-form" />}
          >
            <DemoForm id="sizes-form" className="form-horizontal">
              <div className="row mb-3">
                <div className="col col-sm-5">
                  <label htmlFor="input-small" className="form-control-label">
                    Small Input
                  </label>
                </div>
                <div className="col col-sm-6">
                  <Input
                    variant="bootstrap"
                    id="input-small"
                    name="input-small"
                    placeholder=".form-control-sm"
                    className="form-control-sm"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-sm-5">
                  <label htmlFor="input-normal" className="form-control-label">
                    Normal Input
                  </label>
                </div>
                <div className="col col-sm-6">
                  <Input
                    variant="bootstrap"
                    id="input-normal"
                    name="input-normal"
                    placeholder="Normal"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-sm-5">
                  <label htmlFor="input-large" className="form-control-label">
                    Large Input
                  </label>
                </div>
                <div className="col col-sm-6">
                  <Input
                    variant="bootstrap"
                    id="input-large"
                    name="input-large"
                    placeholder=".form-control-lg"
                    className="form-control-lg"
                  />
                </div>
              </div>
            </DemoForm>
          </FormCard>
        </div>

        {/* Validation states */}
        <div className="col-lg-6">
          <ValidationStatesCard />
        </div>
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Validation states</strong> with optional icons <em>(deprecated)</em>
              </>
            }
          >
            <div className="has-success form-group">
              <label htmlFor="inputSuccess2i" className="form-control-label">
                Input with success
              </label>
              <Input variant="bootstrap" id="inputSuccess2i" className="form-control-success" />
            </div>
            <div className="has-warning form-group">
              <label htmlFor="inputWarning2i" className="form-control-label">
                Input with warning
              </label>
              <Input variant="bootstrap" id="inputWarning2i" className="form-control-warning" />
            </div>
            <div className="has-danger form-group">
              <label htmlFor="inputError2i" className="form-control-label">
                Input with error
              </label>
              <Input variant="bootstrap" id="inputError2i" className="form-control-danger" />
            </div>
          </FormCard>
        </div>

        {/* Icon/Text groups */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Icon/Text</strong> Groups
              </>
            }
            footer={<SubmitReset form="icon-groups-form" submitVariant="success" />}
          >
            <DemoForm id="icon-groups-form" className="form-horizontal">
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <Addon>
                      <i className="fa-solid fa-user" aria-hidden="true" />
                    </Addon>
                    <Input
                      variant="bootstrap"
                      id="input1-group1"
                      name="input1-group1"
                      placeholder="Username"
                      aria-label="Username"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <Input
                      variant="bootstrap"
                      type="email"
                      id="input2-group1"
                      name="input2-group1"
                      placeholder="Email"
                      aria-label="Email"
                    />
                    <Addon>
                      <i className="fa-regular fa-envelope" aria-hidden="true" />
                    </Addon>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <Addon>
                      <i className="fa-solid fa-euro-sign" aria-hidden="true" />
                    </Addon>
                    <Input
                      variant="bootstrap"
                      id="input3-group1"
                      name="input3-group1"
                      placeholder=".."
                      aria-label="Amount in euros"
                    />
                    <Addon>.00</Addon>
                  </div>
                </div>
              </div>
            </DemoForm>
          </FormCard>
        </div>

        {/* Buttons groups */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Buttons</strong> Groups
              </>
            }
            footer={<SubmitReset form="button-groups-form" submitVariant="success" />}
          >
            <DemoForm id="button-groups-form" className="form-horizontal">
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button className="btn btn-primary" type="button">
                        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" /> Search
                      </button>
                    </div>
                    <Input
                      variant="bootstrap"
                      id="input1-group2"
                      name="input1-group2"
                      placeholder="Username"
                      aria-label="Username"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <Input
                      variant="bootstrap"
                      type="email"
                      id="input2-group2"
                      name="input2-group2"
                      placeholder="Email"
                      aria-label="Email"
                    />
                    <div className="input-group-btn">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <button className="btn btn-primary" type="button" aria-label="Search">
                      <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                    </button>
                    <Input
                      variant="bootstrap"
                      id="input3-group2"
                      name="input3-group2"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-secondary" type="reset" aria-label="Clear search">
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </DemoForm>
          </FormCard>
        </div>

        {/* Dropdowns groups */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                <strong>Dropdowns</strong> Groups
              </>
            }
            footer={<SubmitReset form="dropdown-groups-form" submitVariant="success" />}
          >
            <DemoForm id="dropdown-groups-form" className="form-horizontal">
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <InputGroupDropdown label="Dropdown" />
                    <Input
                      variant="bootstrap"
                      id="input1-group3"
                      name="input1-group3"
                      placeholder="Username"
                      aria-label="Username"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <Input
                      variant="bootstrap"
                      type="email"
                      id="input2-group3"
                      name="input2-group3"
                      placeholder="Email"
                      aria-label="Email"
                    />
                    <InputGroupDropdown label="Dropdown" />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-12">
                  <div className="input-group">
                    <InputGroupDropdown label="Action" />
                    <Input
                      variant="bootstrap"
                      id="input3-group3"
                      name="input3-group3"
                      placeholder=".."
                      aria-label="Value"
                    />
                    <InputGroupDropdown label="Dropdown" />
                  </div>
                </div>
              </div>
            </DemoForm>
          </FormCard>
        </div>

        {/* Grid for big devices */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                Use the grid for big devices!{' '}
                <small>
                  <code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code>
                </small>
              </>
            }
            footer={<ActionButtons form="big-grid-form" />}
          >
            <DemoForm id="big-grid-form" className="form-horizontal">
              {[
                [8, 4],
                [7, 5],
                [6, 6],
                [5, 7],
                [4, 8],
              ].map(([a, b]) => (
                <div className="row mb-3" key={`${a}-${b}`}>
                  <GridInput className={`col col-md-${a}`} />
                  <GridInput className={`col col-md-${b}`} />
                </div>
              ))}
            </DemoForm>
          </FormCard>
        </div>

        {/* Grid for small devices */}
        <div className="col-lg-6">
          <FormCard
            header={
              <>
                Input Grid for small devices!{' '}
                <small>
                  <code>.col-*</code>
                </small>
              </>
            }
            footer={<ActionButtons form="small-grid-form" />}
          >
            <DemoForm id="small-grid-form" className="form-horizontal">
              {[
                [4, 8],
                [5, 7],
                [6, 6],
                [7, 5],
                [8, 4],
              ].map(([a, b]) => (
                <div className="row mb-3" key={`${a}-${b}`}>
                  <GridInput className={`col-${a}`} />
                  <GridInput className={`col-${b}`} />
                </div>
              ))}
            </DemoForm>
          </FormCard>
        </div>

        {/* Example forms */}
        <div className="col-lg-6">
          <FormCard header="Example Form">
            <DemoForm id="example-form-1">
              <div className="mb-3">
                <div className="input-group">
                  <Addon>Username</Addon>
                  <Input
                    variant="bootstrap"
                    id="username3"
                    name="username3"
                    aria-label="Username"
                  />
                  <Addon>
                    <i className="fa-solid fa-user" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Addon>Email</Addon>
                  <Input
                    variant="bootstrap"
                    type="email"
                    id="email3"
                    name="email3"
                    aria-label="Email"
                  />
                  <Addon>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Addon>Password</Addon>
                  <Input
                    variant="bootstrap"
                    type="password"
                    id="password3"
                    name="password3"
                    aria-label="Password"
                  />
                  <Addon>
                    <i className="fa-solid fa-asterisk" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="form-actions form-group">
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
            </DemoForm>
          </FormCard>
        </div>
        <div className="col-lg-6">
          <FormCard header="Example Form">
            <DemoForm id="example-form-2">
              <div className="mb-3">
                <div className="input-group">
                  <Input
                    variant="bootstrap"
                    id="username2"
                    name="username2"
                    placeholder="Username"
                  />
                  <Addon>
                    <i className="fa-solid fa-user" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Input
                    variant="bootstrap"
                    type="email"
                    id="email2"
                    name="email2"
                    placeholder="Email"
                  />
                  <Addon>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Input
                    variant="bootstrap"
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Password"
                  />
                  <Addon>
                    <i className="fa-solid fa-asterisk" aria-hidden="true" />
                  </Addon>
                </div>
              </div>
              <div className="form-actions form-group">
                <button type="submit" className="btn btn-secondary btn-sm">
                  Submit
                </button>
              </div>
            </DemoForm>
          </FormCard>
        </div>
        <div className="col-lg-6">
          <FormCard header="Example Form">
            <DemoForm id="example-form-3">
              <div className="mb-3">
                <div className="input-group">
                  <Addon>
                    <i className="fa-solid fa-user" aria-hidden="true" />
                  </Addon>
                  <Input variant="bootstrap" id="username" name="username" placeholder="Username" />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Addon>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                  </Addon>
                  <Input
                    variant="bootstrap"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <Addon>
                    <i className="fa-solid fa-asterisk" aria-hidden="true" />
                  </Addon>
                  <Input
                    variant="bootstrap"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-actions form-group">
                <button type="submit" className="btn btn-success btn-sm">
                  Submit
                </button>
              </div>
            </DemoForm>
          </FormCard>
        </div>
      </div>

      <Footer />
    </>
  )
}
