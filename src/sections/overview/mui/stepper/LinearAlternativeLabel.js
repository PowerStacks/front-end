import { useState } from 'react';
// @mui
import { Box, Step, Paper, Button, Stepper, StepLabel, Typography } from '@mui/material';
// import { ReactHookForm } from '../../extra/form/ReactHookForm';
import { PaymentSummary, PaymentMethods, LocationSummary } from "../../../payment";
// import { Stack, Alert } from '@mui/material';
// import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import GuestBuyForm  from "../../../GuestBuyForm";
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import {NumberContext} from '../../../../contexts/PhoneNumberContext'

// ----------------------------------------------------------------------

const steps = ['Meter Info', 'Review Details', 'Make Payment', 'Reciept'];

const ContentStyle = styled('div')((
  // { theme }
  ) => ({
  maxWidth: '80%',
  margin: 'auto',
  display: 'flex',
  // minHeight: '62vh',
  flexDirection: 'column',
  justifyContent: 'center',
  // padding: theme.spacing(12, 0),
}));



export default function LinearAlternativeLabel() {


  const {phoneNumber, setPhoneNumber} = useContext(NumberContext);
  const [amount, setAmount] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [meterType, setMeterType] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("")
  // const [invoice, setInvoice] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 10;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [invoice, setInvoice] = useState(null);
  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{my: 3}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? ( 
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
         {activeStep === 0 && (
          <ContentStyle>
<GuestBuyForm 
handleNext={handleNext}
setAmount={setAmount}
setMeterNumber={setMeterNumber}
phone={phone}
phoneNumber={phoneNumber}
setPhoneNumber={setPhoneNumber}
setPhone={setPhone}
setMeterType={setMeterType}
setLocation={setLocation}
setEmail={setEmail}

/>

          </ContentStyle>
         

              // <ReactHookForm />
            )}
{activeStep === 1 && (
  <ContentStyle>
              <LocationSummary phone={phone} amount={amount} handleBack={handleBack} handleNext={handleNext} />
              </ContentStyle>
            )}
            {activeStep === 2 && (
              <PaymentMethods 
              amount={amount}
              meterNumber={meterNumber}
              phone={phone}
              meterType={meterType}
              location={location}
              email={email}
              setInvoice={setInvoice} 
              invoice={invoice}
              handleBack={handleBack} handleNext={handleNext} />
            )}
            
            {activeStep === 3 && (
              <PaymentSummary invoice={invoice} />
            )}
          {/* <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          </Paper> */}
          {activeStep === 0 | 1 ? <></> : <Box sx={{ display: 'flex', m: 3 }}>
            <Button color="inherit"  onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>}
          
        </>
      )}
    </>
  );
}
