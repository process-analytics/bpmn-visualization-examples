// from https://github.com/bpmn-miwg/bpmn-miwg-test-suite/blob/4178270d96046fc8a5763f6e4357df2728a21edb/Reference/C.1.1.bpmn
export function getC_1_1_BpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:camunda="http://activiti.org/bpmn" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:signavio="http://www.signavio.com" xmlns:style="http://www.w4.eu/spec/DataComposer/20120927/Diagram/Style" xmlns:w4="http://www.w4.eu/spec/BPMN/20110701/MODEL" xmlns:w4graph="http://www.w4.eu/spec/BPMN/20110930/GRAPH" xmlns:xs="http://xsdTypes.org/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sid-bdb880ac-c464-4e5c-aa56-569d709436e0" w4:version="1.0" exporter="Signavio Process Editor, http://www.signavio.com" exporterVersion="7.0.0" expressionLanguage="http://www.w3.org/1999/XPath" name="C.1.1" targetNamespace="http://www.omg.org/spec/BPMN/20100524/MODEL" typeLanguage="http://www.w3.org/2001/XMLSchema"  xmlns:color="http://www.omg.org/spec/BPMN/non-normative/color/1.0">
  <import importType="http://www.w3.org/2001/XMLSchema" location="xsdTypes.xsd" namespace="http://xsdTypes.org/"/>
  <dataStore id="sid-14ef3d18-7218-4f57-98f0-bb595114754b" isUnlimited="false" name="Financial Accounting System"/>
  <message id="sid-328811a0-7f72-468f-92de-6ab19e353312" name="invoice-received-C.1.0"/>
  <process id="handle-invoice" name="Invoice Handling (OMG BPMN MIWG Demo)" isClosed="true" isExecutable="true" processType="None">
    <extensionElements>
      <w4graph:graphStyle>
        <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        <w4graph:root gridVisible="true" snapToGrid="true" rulerVisible="true" snapToGuide="true" rulerUnit="Pixels">
          <Grid spacing="15" color="230,230,230"/>
          <VerticalRuler/>
          <HorizontalRuler/>
        </w4graph:root>
      </w4graph:graphStyle>
    </extensionElements>
    <userTask id="approveInvoice" camunda:assignee="\${approver}" camunda:formKey="app:approveInvoice.jsf" name="Approve Invoice" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="##unspecified">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffcc"/>
        <signavio:signavioMetaData metaKey="adaptereventtype" metaValue=""/>
        <signavio:signavioMetaData metaKey="documentationlink" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="test" metaValue=""/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <signavio:signavioMetaData metaKey="servicereferenz" metaValue=""/>
        <signavio:signavioMetaData metaKey="risiko" metaValue=""/>
        <signavio:signavioMetaData metaKey="erteiltfreigabe" metaValue=""/>
        <signavio:signavioMetaData metaKey="riskandcontrols" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="194,215,235" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>reviewSuccessful</incoming>
      <incoming>sequenceFlow_178</incoming>
      <outgoing>sequenceFlow_180</outgoing>
      <ioSpecification id="Bpmn_InputOutputSpecification_Y6GAsLH1EeSuDf0W70XLGw">
        <dataOutput id="Bpmn_DataOutput_Y6S1ALH1EeSuDf0W70XLGw" itemSubjectRef="xsdBool" isCollection="false" name="approved">
          <extensionElements>
            <w4graph:graphStyle>
                     <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
                  </w4graph:graphStyle>
          </extensionElements>
        </dataOutput>
        <inputSet id="Bpmn_InputSet_Y6GAsrH1EeSuDf0W70XLGw" name="default input set">
          <outputSetRefs>Bpmn_OutputSet_Y6GAsbH1EeSuDf0W70XLGw</outputSetRefs>
        </inputSet>
        <outputSet id="Bpmn_OutputSet_Y6GAsbH1EeSuDf0W70XLGw" name="default output set">
          <dataOutputRefs>Bpmn_DataOutput_Y6S1ALH1EeSuDf0W70XLGw</dataOutputRefs>
          <inputSetRefs>Bpmn_InputSet_Y6GAsrH1EeSuDf0W70XLGw</inputSetRefs>
        </outputSet>
      </ioSpecification>
      <dataOutputAssociation id="Bpmn_DataOutputAssociation_Y55MYrH1EeSuDf0W70XLGw">
        <extensionElements>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            <w4graph:line routerType="Rectilinear" automaticRoute="false" closestRoute="false" avoidObstacleRoute="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <sourceRef>Bpmn_DataOutput_Y6S1ALH1EeSuDf0W70XLGw</sourceRef>
        <targetRef>Bpmn_DataObjectReference_YGA4YLH1EeSuDf0W70XLGw</targetRef>
      </dataOutputAssociation>
      <potentialOwner id="Bpmn_ResourceRole_MdyGcLH0EeS1nbPdxxCzlg" name="Approve Invoice Potential Owner">
        <resourceRef>Bpmn_Resource_8nPrkLHzEeS1nbPdxxCzlg</resourceRef>
      </potentialOwner>
    </userTask>
    <exclusiveGateway id="invoice_approved" name="Invoice&#xD;&#xA;approved?" gatewayDirection="Diverging">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="185,139,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sequenceFlow_180</incoming>
      <outgoing>invoiceApproved</outgoing>
      <outgoing>invoiceNotApproved</outgoing>
    </exclusiveGateway>
    <userTask id="assignApprover" camunda:assignee="demo" camunda:formKey="app:assignApprover.jsf" name="Assign&#xD;&#xA;Approver" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="##unspecified">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffcc"/>
        <signavio:signavioMetaData metaKey="adaptereventtype" metaValue=""/>
        <signavio:signavioMetaData metaKey="documentationlink" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="test" metaValue=""/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <signavio:signavioMetaData metaKey="servicereferenz" metaValue=""/>
        <signavio:signavioMetaData metaKey="risiko" metaValue=""/>
        <signavio:signavioMetaData metaKey="erteiltfreigabe" metaValue=""/>
        <signavio:signavioMetaData metaKey="riskandcontrols" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="194,215,235" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>SequenceFlow_1</incoming>
      <outgoing>sequenceFlow_178</outgoing>
      <ioSpecification id="Bpmn_InputOutputSpecification_assignApprover">
        <dataOutput id="Bpmn_DataOutput_assignApprover" itemSubjectRef="xsdString" isCollection="false" name="approver">
          <extensionElements>
            <w4graph:graphStyle>
                     <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
                  </w4graph:graphStyle>
          </extensionElements>
        </dataOutput>
        <inputSet id="Bpmn_InputSet_assignApprover" name="default input set">
          <outputSetRefs>Bpmn_OutputSet_assignApprover</outputSetRefs>
        </inputSet>
        <outputSet id="Bpmn_OutputSet_assignApprover" name="default output set">
          <dataOutputRefs>Bpmn_DataOutput_assignApprover</dataOutputRefs>
          <inputSetRefs>Bpmn_InputSet_assignApprover</inputSetRefs>
        </outputSet>
      </ioSpecification>
      <dataOutputAssociation id="Bpmn_DataOutputAssociation_assignApprover">
        <extensionElements>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            <w4graph:line routerType="Rectilinear" automaticRoute="false" closestRoute="false" avoidObstacleRoute="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <sourceRef>Bpmn_DataOutput_assignApprover</sourceRef>
        <targetRef>Bpmn_DataObjectReference_assignApprover</targetRef>
      </dataOutputAssociation>
      <potentialOwner id="Bpmn_ResourceRole_DSeNcLH0EeS1nbPdxxCzlg" name="Assign Approver Potential Owner">
        <resourceRef>Bpmn_Resource_6vVHsLHzEeS1nbPdxxCzlg</resourceRef>
      </potentialOwner>
    </userTask>
    <userTask id="reviewInvoice" camunda:assignee="demo" camunda:formKey="app:reviewInvoice.jsf" name="Rechnung klären" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="##unspecified">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffcc"/>
        <signavio:signavioMetaData metaKey="adaptereventtype" metaValue=""/>
        <signavio:signavioMetaData metaKey="documentationlink" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="test" metaValue=""/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <signavio:signavioMetaData metaKey="servicereferenz" metaValue=""/>
        <signavio:signavioMetaData metaKey="risiko" metaValue=""/>
        <signavio:signavioMetaData metaKey="erteiltfreigabe" metaValue=""/>
        <signavio:signavioMetaData metaKey="riskandcontrols" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="194,215,235" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>invoiceNotApproved</incoming>
      <outgoing>sequenceFlow_183</outgoing>
      <ioSpecification id="Bpmn_InputOutputSpecification_dB6xs7H1EeSuDf0W70XLGw">
        <dataOutput id="Bpmn_DataOutput_dCG-8LH1EeSuDf0W70XLGw" itemSubjectRef="xsdString" isCollection="false" name="clarified">
          <extensionElements>
            <w4graph:graphStyle>
                     <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
                  </w4graph:graphStyle>
          </extensionElements>
        </dataOutput>
        <inputSet id="Bpmn_InputSet_dB6xtbH1EeSuDf0W70XLGw" name="default input set">
          <outputSetRefs>Bpmn_OutputSet_dB6xtLH1EeSuDf0W70XLGw</outputSetRefs>
        </inputSet>
        <outputSet id="Bpmn_OutputSet_dB6xtLH1EeSuDf0W70XLGw" name="default output set">
          <dataOutputRefs>Bpmn_DataOutput_dCG-8LH1EeSuDf0W70XLGw</dataOutputRefs>
          <inputSetRefs>Bpmn_InputSet_dB6xtbH1EeSuDf0W70XLGw</inputSetRefs>
        </outputSet>
      </ioSpecification>
      <dataOutputAssociation id="Bpmn_DataOutputAssociation_dB6xsrH1EeSuDf0W70XLGw">
        <extensionElements>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            <w4graph:line routerType="Rectilinear" automaticRoute="false" closestRoute="false" avoidObstacleRoute="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <sourceRef>Bpmn_DataOutput_dCG-8LH1EeSuDf0W70XLGw</sourceRef>
        <targetRef>Bpmn_DataObjectReference_cdsDQLH1EeSuDf0W70XLGw</targetRef>
      </dataOutputAssociation>
      <potentialOwner id="Bpmn_ResourceRole_GrG9MLH0EeS1nbPdxxCzlg" name="Review Invoice Potential Owner">
        <resourceRef>Bpmn_Resource_6vVHsLHzEeS1nbPdxxCzlg</resourceRef>
      </potentialOwner>
    </userTask>
    <exclusiveGateway id="reviewSuccessful_gw" name="Review&#xA;successful?" gatewayDirection="Diverging">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="185,139,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sequenceFlow_183</incoming>
      <outgoing>reviewSuccessful</outgoing>
      <outgoing>reviewNotSuccessful</outgoing>
    </exclusiveGateway>
    <endEvent id="invoiceNotProcessed" name="Invoice not&#xA;processed">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="190,0,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>reviewNotSuccessful</incoming>
    </endEvent>
    <startEvent id="StartEvent_1" camunda:formKey="app:startProcess.jsf" name="Invoice&#xD;&#xA;received" isInterrupting="true">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="109,183,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <outgoing>SequenceFlow_1</outgoing>
    </startEvent>
    <userTask id="prepareBankTransfer" camunda:candidateGroups="accounting" camunda:formKey="app:prepareBankTransfer.jsf" name="Prepare&#xD;&#xA;Bank&#xD;&#xA;Transfer" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="##unspecified">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffcc"/>
        <signavio:signavioMetaData metaKey="adaptereventtype" metaValue=""/>
        <signavio:signavioMetaData metaKey="documentationlink" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="test" metaValue=""/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <signavio:signavioMetaData metaKey="servicereferenz" metaValue=""/>
        <signavio:signavioMetaData metaKey="risiko" metaValue=""/>
        <signavio:signavioMetaData metaKey="erteiltfreigabe" metaValue=""/>
        <signavio:signavioMetaData metaKey="riskandcontrols" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="194,215,235" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>invoiceApproved</incoming>
      <outgoing>SequenceFlow_2</outgoing>
      <potentialOwner id="Bpmn_ResourceRole_PKHJ0LH0EeS1nbPdxxCzlg" name="Prepare Bank Transfer Potential Owner">
        <resourceRef>Bpmn_Resource_-IajYLHzEeS1nbPdxxCzlg</resourceRef>
      </potentialOwner>
    </userTask>
    <endEvent id="invoiceProcessed" name="Invoice&#xA;processed">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="190,0,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>SequenceFlow_3</incoming>
    </endEvent>
    <serviceTask id="archiveInvoice" camunda:delegateExpression="#{archiveService}" w4:serviceName="ArchiveInvoiceService" name="Archive&#xA;Invoice" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="##unspecified">
      <extensionElements>
        <camunda:field name="text0" stringValue="Hello World"/>
        <camunda:field name="text1">
               <camunda:expression>\${genderBean.getGenderString(gender)}</camunda:expression>
            </camunda:field>
        <camunda:field name="text2">
               <camunda:expression>Hello \${gender == 'male' ? 'Mr.' : 'Mrs.'} ${name}</camunda:expression>
            </camunda:field>
        <camunda:field name="text3">
               <camunda:string><![CDATA[
\t          Hello World
\t      ]]></camunda:string>
            </camunda:field>
        <camunda:field name="text4">
               <camunda:string><![CDATA[
\t          <p>Hello World</p><br>
\t      ]]></camunda:string>
            </camunda:field>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffcc"/>
        <signavio:signavioMetaData metaKey="adaptereventtype" metaValue=""/>
        <signavio:signavioMetaData metaKey="documentationlink" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="test" metaValue=""/>
        <signavio:signavioMetaData metaKey="adaptertype" metaValue=""/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="adapterconfiguration" metaValue=""/>
        <signavio:signavioMetaData metaKey="adapterclassname" metaValue=""/>
        <signavio:signavioMetaData metaKey="servicereferenz" metaValue=""/>
        <signavio:signavioMetaData metaKey="risiko" metaValue=""/>
        <signavio:signavioMetaData metaKey="erteiltfreigabe" metaValue=""/>
        <signavio:signavioMetaData metaKey="riskandcontrols" metaValue=""/>
        <w4graph:graphStyle>
          <w4graph:basic background="194,215,235" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>SequenceFlow_2</incoming>
      <outgoing>SequenceFlow_3</outgoing>
    </serviceTask>
    <sequenceFlow id="invoiceApproved" name="yes" isImmediate="true" sourceRef="invoice_approved" targetRef="prepareBankTransfer">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-0ed8a0cb-f28a-4689-bbd8-77dafd0ccfa0"><![CDATA[bpmn:getDataObject('approved')]]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="invoiceNotApproved" name="no" isImmediate="true" sourceRef="invoice_approved" targetRef="reviewInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-d4f3f0f7-79c3-4b1c-817e-13d9bdd96666"><![CDATA[not(bpmn:getDataObject('approved'))]]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="reviewSuccessful" name="yes" isImmediate="true" sourceRef="reviewSuccessful_gw" targetRef="approveInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-e669aead-8bad-4dbb-b282-e9f811e02f77"><![CDATA[bpmn:getDataObject('clarified') = 'yes']]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="reviewNotSuccessful" name="no" isImmediate="true" sourceRef="reviewSuccessful_gw" targetRef="invoiceNotProcessed">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-628a2fdc-7654-4273-930d-8e3127b9e8b2"><![CDATA[bpmn:getDataObject('clarified') = 'no']]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="sequenceFlow_180" isImmediate="true" sourceRef="approveInvoice" targetRef="invoice_approved">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sequenceFlow_183" isImmediate="true" sourceRef="reviewInvoice" targetRef="reviewSuccessful_gw">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sequenceFlow_178" isImmediate="true" sourceRef="assignApprover" targetRef="approveInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="SequenceFlow_2" isImmediate="true" sourceRef="prepareBankTransfer" targetRef="archiveInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="SequenceFlow_3" isImmediate="true" sourceRef="archiveInvoice" targetRef="invoiceProcessed">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="SequenceFlow_1" isImmediate="true" sourceRef="StartEvent_1" targetRef="assignApprover">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <dataObject id="Bpmn_DataObject_approver" name="approver" itemSubjectRef="xsdString" isCollection="false">
      <extensionElements>
        <w4graph:graphStyle>
               <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            </w4graph:graphStyle>
      </extensionElements>
    </dataObject>
    <dataObjectReference id="Bpmn_DataObjectReference_assignApprover" name="approver" dataObjectRef="Bpmn_DataObject_approver">
      <extensionElements>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </dataObjectReference>
    <dataObject id="Bpmn_DataObject_WUfQYrH1EeSuDf0W70XLGw" name="approved" itemSubjectRef="xsdBool" isCollection="false">
      <extensionElements>
        <w4graph:graphStyle>
               <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            </w4graph:graphStyle>
      </extensionElements>
    </dataObject>
    <dataObjectReference id="Bpmn_DataObjectReference_YGA4YLH1EeSuDf0W70XLGw" name="approved" dataObjectRef="Bpmn_DataObject_WUfQYrH1EeSuDf0W70XLGw">
      <extensionElements>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </dataObjectReference>
    <dataObject id="Bpmn_DataObject_aT_L0rH1EeSuDf0W70XLGw" name="clarified" itemSubjectRef="xsdString" isCollection="false">
      <extensionElements>
        <w4graph:graphStyle>
               <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
            </w4graph:graphStyle>
      </extensionElements>
    </dataObject>
    <dataObjectReference id="Bpmn_DataObjectReference_cdsDQLH1EeSuDf0W70XLGw" name="clarified" dataObjectRef="Bpmn_DataObject_aT_L0rH1EeSuDf0W70XLGw">
      <extensionElements>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </dataObjectReference>
  </process>
  <resource id="Bpmn_Resource_6vVHsLHzEeS1nbPdxxCzlg" w4:type="User" name="Team Assistant"/>
  <resource id="Bpmn_Resource_8nPrkLHzEeS1nbPdxxCzlg" w4:type="User" name="Approver"/>
  <resource id="Bpmn_Resource_-IajYLHzEeS1nbPdxxCzlg" w4:type="User" name="Accountant"/>
  <itemDefinition id="xsdString" isCollection="false" itemKind="Information" structureRef="xs:tString"/>
  <itemDefinition id="xsdBool" isCollection="false" itemKind="Information" structureRef="xs:tBool"/>
  <bpmndi:BPMNDiagram id="sid-78cf0368-c97e-4dea-885f-0e535c20d6c7" name="sid-78cf0368-c97e-4dea-885f-0e535c20d6c7">
    <bpmndi:BPMNPlane id="sid-39085760-f7ff-4491-a241-483b340d6533" bpmnElement="handle-invoice">
      <bpmndi:BPMNShape id="approveInvoice_gui" bpmnElement="approveInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="353.0" y="225.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_F6DF0AbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="60.0" x="373.0" y="250.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoice_approved_gui" bpmnElement="invoice_approved" isMarkerVisible="true" color:background-color="#b98b00">
        <omgdc:Bounds height="40.0" width="40.0" x="488.0" y="245.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_G0etwAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="64.0" x="476.0" y="285.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="assignApprover_gui" bpmnElement="assignApprover" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="180.0" y="52.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_CoZH0AbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="64.0" x="198.0" y="77.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="reviewInvoice_gui" bpmnElement="reviewInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="548.0" y="52.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_JOy0EAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="69.0" x="564.0" y="77.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="reviewSuccessful_gw_gui" bpmnElement="reviewSuccessful_gw" color:background-color="#b98b00">
        <omgdc:Bounds height="40.0" width="40.0" x="693.0" y="72.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_KymwMAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="75.0" x="676.0" y="112.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoiceNotProcessed_gui" bpmnElement="invoiceNotProcessed" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="926.0" y="78.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_NIsd0AbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="75.0" x="903.0" y="106.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1_gui" bpmnElement="StartEvent_1" color:background-color="#6db700">
        <omgdc:Bounds height="30.0" width="30.0" x="95.0" y="77.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_CAhPgAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="57.0" x="82.0" y="107.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="prepareBankTransfer_gui" bpmnElement="prepareBankTransfer" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="638.0" y="385.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_N15iEAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="45.0" width="63.0" x="657.0" y="403.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoiceProcessed_gui" bpmnElement="invoiceProcessed" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="926.0" y="411.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_PRFtsAbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="63.0" x="909.0" y="439.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="archiveInvoice_gui" bpmnElement="archiveInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="780.0" y="385.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_OiSG8AbSEealeL5I4Yl3Dw" labelStyle="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="30.0" width="57.0" x="802.0" y="410.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="invoiceApproved_gui" bpmnElement="invoiceApproved">
        <omgdi:waypoint xsi:type="omgdc:Point" x="528.0" y="265.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="587.0" y="265.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="587.0" y="425.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="638.0" y="425.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_TrJhgLHzEeS1nbPdxxCzlg" labelStyle="Bpmndi_BPMNLabelStyle_VPK5ALHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="26.0" width="32.0" x="533.0" y="270.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="invoiceNotApproved_gui" bpmnElement="invoiceNotApproved">
        <omgdi:waypoint xsi:type="omgdc:Point" x="508.0" y="245.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="508.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="548.0" y="92.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_TrJhgbHzEeS1nbPdxxCzlg" labelStyle="Bpmndi_BPMNLabelStyle_VPMuMLHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="15.0" width="23.0" x="513.0" y="226.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="reviewSuccessful_gui" bpmnElement="reviewSuccessful">
        <omgdi:waypoint xsi:type="omgdc:Point" x="713.0" y="72.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="713.0" y="35.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="403.0" y="35.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="403.0" y="225.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_TrJhgrHzEeS1nbPdxxCzlg" labelStyle="Bpmndi_BPMNLabelStyle_VNihUbHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="22.0" width="27.0" x="718.0" y="45.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="reviewNotSuccessful_gui" bpmnElement="reviewNotSuccessful">
        <omgdi:waypoint xsi:type="omgdc:Point" x="733.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="926.0" y="92.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_TrJhg7HzEeS1nbPdxxCzlg" labelStyle="Bpmndi_BPMNLabelStyle_VQnqgLHzEeS1nbPdxxCzlg">
          <omgdc:Bounds height="26.0" width="24.0" x="738.0" y="97.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_180_gui" bpmnElement="sequenceFlow_180">
        <omgdi:waypoint xsi:type="omgdc:Point" x="453.0" y="265.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="488.0" y="265.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_183_gui" bpmnElement="sequenceFlow_183">
        <omgdi:waypoint xsi:type="omgdc:Point" x="648.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="693.0" y="92.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_178_gui" bpmnElement="sequenceFlow_178">
        <omgdi:waypoint xsi:type="omgdc:Point" x="280.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="310.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="310.0" y="265.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="353.0" y="265.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_2_gui" bpmnElement="SequenceFlow_2">
        <omgdi:waypoint xsi:type="omgdc:Point" x="738.0" y="425.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="780.0" y="425.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_3_gui" bpmnElement="SequenceFlow_3">
        <omgdi:waypoint xsi:type="omgdc:Point" x="880.0" y="425.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="926.0" y="425.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1_gui" bpmnElement="SequenceFlow_1">
        <omgdi:waypoint xsi:type="omgdc:Point" x="125.0" y="92.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="180.0" y="92.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Bpmndi_BPMNShape_assignApprover" bpmnElement="Bpmn_DataObjectReference_assignApprover" color:background-color="#999999">
        <omgdc:Bounds height="35.0" width="35.0" x="212.0" y="174.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_assignApprover" labelStyle="Bpmndi_BPMNLabelStyle_YGO60LH1EeSuDf0W70XLGw">
          <omgdc:Bounds height="15.0" width="57.0" x="201.0" y="209.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Bpmndi_BPMNEdge_assignApprover" bpmnElement="Bpmn_DataOutputAssociation_assignApprover" sourceElement="assignApprover_gui">
        <omgdi:waypoint xsi:type="omgdc:Point" x="230.0" y="132.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="230.0" y="174.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_assignApprover2"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Bpmndi_BPMNShape_YGA4YbH1EeSuDf0W70XLGw" bpmnElement="Bpmn_DataObjectReference_YGA4YLH1EeSuDf0W70XLGw" color:background-color="#999999">
        <omgdc:Bounds height="35.0" width="35.0" x="385.0" y="350.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_YGA4YrH1EeSuDf0W70XLGw" labelStyle="Bpmndi_BPMNLabelStyle_YGO60LH1EeSuDf0W70XLGw">
          <omgdc:Bounds height="22.0" width="59.0" x="373.0" y="385.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Bpmndi_BPMNEdge_Y55MYLH1EeSuDf0W70XLGw" bpmnElement="Bpmn_DataOutputAssociation_Y55MYrH1EeSuDf0W70XLGw" sourceElement="approveInvoice_gui">
        <omgdi:waypoint xsi:type="omgdc:Point" x="403.0" y="305.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="403.0" y="350.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_Y55MYbH1EeSuDf0W70XLGw"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Bpmndi_BPMNShape_cdsDQbH1EeSuDf0W70XLGw" bpmnElement="Bpmn_DataObjectReference_cdsDQLH1EeSuDf0W70XLGw" color:background-color="#999999">
        <omgdc:Bounds height="35.0" width="35.0" x="580.0" y="174.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_cdsDQrH1EeSuDf0W70XLGw" labelStyle="Bpmndi_BPMNLabelStyle_cd6FsLH1EeSuDf0W70XLGw">
          <omgdc:Bounds height="15.0" width="63.0" x="566.0" y="209.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Bpmndi_BPMNEdge_dB6xsLH1EeSuDf0W70XLGw" bpmnElement="Bpmn_DataOutputAssociation_dB6xsrH1EeSuDf0W70XLGw" sourceElement="reviewInvoice_gui">
        <omgdi:waypoint xsi:type="omgdc:Point" x="598.0" y="132.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="598.0" y="174.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_dB6xsbH1EeSuDf0W70XLGw"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_VNihULHzEeS1nbPdxxCzlg">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_VNihUbHzEeS1nbPdxxCzlg">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_VPK5ALHzEeS1nbPdxxCzlg">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_VPMuMLHzEeS1nbPdxxCzlg">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_VQnqgLHzEeS1nbPdxxCzlg">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_XtXu4LH1EeSuDf0W70XLGw">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_YGO60LH1EeSuDf0W70XLGw">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_b8Xe4LH1EeSuDf0W70XLGw">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_cd6FsLH1EeSuDf0W70XLGw">
      <omgdc:Font name="Segoe UI" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
  </bpmndi:BPMNDiagram>
</definitions>`;
}
