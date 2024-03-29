import { Injectable } from '@angular/core';
import { delay, Observable, of, scan, tap } from 'rxjs';
import { environment } from "../../environments/environment";
import { ActionsNotifierService } from "./actions-notifier.service";
import { ActionStatus } from "../utils/types";

let fetchCalls = 0;

/**
 * Simulate BPMN diagram fetch with delay (controlled by environment.delayDuration).
 */
@Injectable({
  providedIn: 'root',
})
export class BpmnDiagramService {

  constructor(private actionsNotifierService: ActionsNotifierService) { }

  getDiagram(index: number): Observable<string> {
    const action: ActionStatus = {type: 'fetch', status: 'in-progress', id: fetchCalls, subType: 'diagram'};
    return this.getDiagramContent(index)
      .pipe(
        tap(() => this.actionsNotifierService.post(action)),
        // use delay to simulate long diagram fetching
        delay(environment.delayDuration),
        tap(() => {
          this.actionsNotifierService.post({...action, status: 'done'});
          fetchCalls++;
        }),
      );
  }

  private getDiagramContent(index: number): Observable<string> {
    switch (index) {
      case 0:
        return this.getDiagramIdx0();
      case 1:
        return this.getDiagramIdx1();
      default:
        return of('');
    }
  }

  private getDiagramIdx0(): Observable<string> {
    return of(`
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_01afj0d" targetNamespace="http://example.com/schema/bpmn">
  <bpmn:process id="Process_0yqq1lz" isExecutable="false">
    <bpmn:startEvent id="StartEvent_08hc3xj" name="Start coding">
      <bpmn:outgoing>Flow_1wkfbb0</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1potg3p" name="Enjoy &#39;bpmn-visualization&#39;">
      <bpmn:incoming>Flow_1wkfbb0</bpmn:incoming>
      <bpmn:outgoing>Flow_133a5kz</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1wkfbb0" sourceRef="StartEvent_08hc3xj" targetRef="Activity_1potg3p" />
    <bpmn:endEvent id="Event_05akz22" name="See you later!">
      <bpmn:incoming>Flow_133a5kz</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_133a5kz" sourceRef="Activity_1potg3p" targetRef="Event_05akz22" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0yqq1lz">
      <bpmndi:BPMNEdge id="Flow_1wkfbb0_di" bpmnElement="Flow_1wkfbb0">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="250" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_133a5kz_di" bpmnElement="Flow_133a5kz">
        <di:waypoint x="350" y="99" />
        <di:waypoint x="412" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_08hc3xj">
        <dc:Bounds x="156" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="145" y="124" width="59" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1potg3p_di" bpmnElement="Activity_1potg3p">
        <dc:Bounds x="250" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_05akz22_di" bpmnElement="Event_05akz22">
        <dc:Bounds x="412" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="396" y="124" width="68" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
    `);
  }

  private getDiagramIdx1(): Observable<string> {
    return of(`
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:camunda="http://activiti.org/bpmn" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:signavio="http://www.signavio.com" xmlns:style="http://www.w4.eu/spec/DataComposer/20120927/Diagram/Style" xmlns:w4="http://www.w4.eu/spec/BPMN/20110701/MODEL" xmlns:w4graph="http://www.w4.eu/spec/BPMN/20110930/GRAPH" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sid-bdb880ac-c464-4e5c-aa56-569d709436e0" w4:version="1.0" exporter="Signavio Process Editor, http://www.signavio.com" exporterVersion="7.0.0" expressionLanguage="http://www.w3.org/1999/XPath" name="C.1.0" targetNamespace="http://www.signavio.com/bpmn20" typeLanguage="http://www.w3.org/2001/XMLSchema" xmlns:color="http://www.omg.org/spec/BPMN/non-normative/color/1.0">
  <message id="sid-328811a0-7f72-468f-92de-6ab19e353312" name="invoice-received-C.1.0"/>
  <collaboration id="sid-e5defbed-c12d-4c0a-9b5e-0f187e35ffd3">
    <extensionElements>
      <w4graph:graphStyle>
        <w4graph:basic background="0,0,0" foreground="0,0,0" autoResize="false" borderColor="255,255,255" collapsed="false"/>
        <w4graph:root gridVisible="true" snapToGrid="true" rulerVisible="true" snapToGuide="true" rulerUnit="Pixels">
          <Grid spacing="15" color="230,230,230"/>
          <VerticalRuler/>
          <HorizontalRuler/>
        </w4graph:root>
      </w4graph:graphStyle>
    </extensionElements>
    <participant id="sid-46891B57-A9D3-4A8B-AEBF-D4BA5F3961AD" name="Team-Assistant" processRef="sid-5FBB6CB3-8A7C-42B5-9024-15BB2684EC57">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="rolle" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="192,192,192" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </participant>
    <participant id="Process_Engine_1" name="Process Engine - Invoice Receipt" processRef="bpmn-miwg-test-case-c.1.0">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="rolle" metaValue="[]"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="192,192,192" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </participant>
    <messageFlow id="sid-915AC9A0-CD35-4DF2-93F7-4535397622F8" sourceRef="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D" targetRef="reviewInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </messageFlow>
    <messageFlow id="sid-AB6EB7C8-DF5E-42C2-88D0-FA166583AF15" sourceRef="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD" targetRef="assignApprover">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </messageFlow>
    <messageFlow id="sid-7A070DED-8B83-48E1-88A1-5543C481E7BC" sourceRef="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF" targetRef="StartEvent_1">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </messageFlow>
    <messageFlow id="sid-90902E27-C1CD-4F90-A8F2-486DA4F42117" sourceRef="assignApprover" targetRef="sid-40EC6574-E644-425C-8CE7-EE384F0C3520">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </messageFlow>
    <messageFlow id="sid-0518A412-1ED3-4CFD-A75C-69FF37EFFC16" sourceRef="reviewInvoice" targetRef="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="153,153,153" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </messageFlow>
  </collaboration>
  <process id="sid-5FBB6CB3-8A7C-42B5-9024-15BB2684EC57" name="Team-Assistant" isClosed="true" isExecutable="false" processType="None">
    <extensionElements>
      <w4graph:graphStyle>
        <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
      </w4graph:graphStyle>
    </extensionElements>
    <laneSet id="sid-c6eca5e8-8b8f-4e42-b8d8-6b7e858672df">
      <lane id="sid-744AEFB3-C93D-46A3-8976-EFA91784A51F">
        <extensionElements>
          <signavio:signavioMetaData metaKey="bgcolor" metaValue=""/>
          <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <flowNodeRef>sid-36EA43D1-0FE6-4197-AC57-7A43785B784B</flowNodeRef>
        <flowNodeRef>sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF</flowNodeRef>
        <flowNodeRef>sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44</flowNodeRef>
        <flowNodeRef>sid-BC9AC0B6-1785-4E35-A974-7FEF1A586B9D</flowNodeRef>
        <flowNodeRef>sid-40EC6574-E644-425C-8CE7-EE384F0C3520</flowNodeRef>
        <flowNodeRef>sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD</flowNodeRef>
        <flowNodeRef>sid-F0D29912-929D-491C-8D23-73BD80CF980A</flowNodeRef>
        <flowNodeRef>sid-B548B980-12E3-408E-9AC4-7031B85A8F2D</flowNodeRef>
        <flowNodeRef>sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D</flowNodeRef>
        <flowNodeRef>sid-0E349B8B-14A7-4565-988A-38F3A9B624D2</flowNodeRef>
        <flowNodeRef>sid-282524E6-660F-431D-8F19-1C3E9E9DE817</flowNodeRef>
      </lane>
    </laneSet>
    <startEvent id="sid-36EA43D1-0FE6-4197-AC57-7A43785B784B" name="Invoice&#xA;received" isInterrupting="true">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="109,183,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <outgoing>sid-7971C38C-2EF5-41F2-A24E-3FFCA069EDBF</outgoing>
      <messageEventDefinition id="sid-7f89416b-58ec-4e26-b9bc-390f9e8f2ae0"/>
    </startEvent>
    <task id="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF" name="Scan Invoice" completionQuantity="1" isForCompensation="false" startQuantity="1">
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
      <incoming>sid-7971C38C-2EF5-41F2-A24E-3FFCA069EDBF</incoming>
      <outgoing>sid-3E8B2FCF-E408-4A5D-9455-8FDE7BB3EF96</outgoing>
    </task>
    <task id="sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44" name="Archive&#xA;original" completionQuantity="1" isForCompensation="false" startQuantity="1">
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
      <incoming>sid-3E8B2FCF-E408-4A5D-9455-8FDE7BB3EF96</incoming>
      <outgoing>sid-C0540F47-C3C0-4FA8-B000-6D87640A6178</outgoing>
    </task>
    <endEvent id="sid-BC9AC0B6-1785-4E35-A974-7FEF1A586B9D">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="190,0,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-3019478F-48D5-4B85-95B1-E192B9BE4183</incoming>
    </endEvent>
    <intermediateCatchEvent id="sid-40EC6574-E644-425C-8CE7-EE384F0C3520" name="Approver to &#xA;be assigned">
      <extensionElements>
        <signavio:signavioLabel ref="text_name" valign="bottom" x="16.0" y="-8.0"/>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="41,83,231" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-C0540F47-C3C0-4FA8-B000-6D87640A6178</incoming>
      <outgoing>sid-4AD2006C-9290-42B0-A904-DD8076B791C4</outgoing>
      <messageEventDefinition id="sid-29fbb68c-e460-48c1-bba9-a1b16906afec"/>
    </intermediateCatchEvent>
    <task id="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD" name="Assign approver" completionQuantity="1" isForCompensation="false" startQuantity="1">
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
      <incoming>sid-4AD2006C-9290-42B0-A904-DD8076B791C4</incoming>
      <outgoing>sid-26030150-7369-4B7F-8264-B3ABC62BA735</outgoing>
    </task>
    <eventBasedGateway id="sid-F0D29912-929D-491C-8D23-73BD80CF980A" gatewayDirection="Diverging" eventGatewayType="Exclusive" instantiate="false">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="185,139,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-26030150-7369-4B7F-8264-B3ABC62BA735</incoming>
      <outgoing>sid-71EF9530-A32A-49BC-A783-9B98A5801362</outgoing>
      <outgoing>sid-4686AFBC-E33A-4657-95A0-B2E27E704152</outgoing>
    </eventBasedGateway>
    <intermediateCatchEvent id="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D" name="Invoice review&#xA; needed">
      <extensionElements>
        <signavio:signavioLabel ref="text_name" valign="bottom" x="16.0" y="-8.0"/>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="41,83,231" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-4686AFBC-E33A-4657-95A0-B2E27E704152</incoming>
      <outgoing>sid-D03CC374-8575-4F38-98B4-4DFF014C43CB</outgoing>
      <messageEventDefinition id="sid-b9aae81c-0006-46ad-9445-89307e8eeed8"/>
    </intermediateCatchEvent>
    <task id="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D" name="Review and document result" completionQuantity="1" isForCompensation="false" startQuantity="1">
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
      <incoming>sid-D03CC374-8575-4F38-98B4-4DFF014C43CB</incoming>
      <outgoing>sid-6CB8539C-E02A-4496-94E7-17FAECB0D4B1</outgoing>
    </task>
    <intermediateCatchEvent id="sid-0E349B8B-14A7-4565-988A-38F3A9B624D2" name="7 days">
      <extensionElements>
        <signavio:signavioLabel ref="text_name" valign="bottom" x="16.0" y="-8.0"/>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="41,83,231" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-71EF9530-A32A-49BC-A783-9B98A5801362</incoming>
      <outgoing>sid-3019478F-48D5-4B85-95B1-E192B9BE4183</outgoing>
      <timerEventDefinition id="sid-6517379a-613c-497d-81cc-b710878d9ebb"/>
    </intermediateCatchEvent>
    <endEvent id="sid-282524E6-660F-431D-8F19-1C3E9E9DE817">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="190,0,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>sid-6CB8539C-E02A-4496-94E7-17FAECB0D4B1</incoming>
    </endEvent>
    <sequenceFlow id="sid-71EF9530-A32A-49BC-A783-9B98A5801362" isImmediate="true" sourceRef="sid-F0D29912-929D-491C-8D23-73BD80CF980A" targetRef="sid-0E349B8B-14A7-4565-988A-38F3A9B624D2">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-C0540F47-C3C0-4FA8-B000-6D87640A6178" isImmediate="true" sourceRef="sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44" targetRef="sid-40EC6574-E644-425C-8CE7-EE384F0C3520">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-4AD2006C-9290-42B0-A904-DD8076B791C4" isImmediate="true" sourceRef="sid-40EC6574-E644-425C-8CE7-EE384F0C3520" targetRef="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-3E8B2FCF-E408-4A5D-9455-8FDE7BB3EF96" isImmediate="true" sourceRef="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF" targetRef="sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-4686AFBC-E33A-4657-95A0-B2E27E704152" isImmediate="true" sourceRef="sid-F0D29912-929D-491C-8D23-73BD80CF980A" targetRef="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-6CB8539C-E02A-4496-94E7-17FAECB0D4B1" isImmediate="true" sourceRef="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D" targetRef="sid-282524E6-660F-431D-8F19-1C3E9E9DE817">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-D03CC374-8575-4F38-98B4-4DFF014C43CB" isImmediate="true" sourceRef="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D" targetRef="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-3019478F-48D5-4B85-95B1-E192B9BE4183" isImmediate="true" sourceRef="sid-0E349B8B-14A7-4565-988A-38F3A9B624D2" targetRef="sid-BC9AC0B6-1785-4E35-A974-7FEF1A586B9D">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-26030150-7369-4B7F-8264-B3ABC62BA735" isImmediate="true" sourceRef="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD" targetRef="sid-F0D29912-929D-491C-8D23-73BD80CF980A">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="sid-7971C38C-2EF5-41F2-A24E-3FFCA069EDBF" isImmediate="true" sourceRef="sid-36EA43D1-0FE6-4197-AC57-7A43785B784B" targetRef="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
    </sequenceFlow>
  </process>
  <process id="bpmn-miwg-test-case-c.1.0" name="BPMN MIWG Test Case C.1.0" isClosed="true" isExecutable="true" processType="None">
    <extensionElements>
      <w4graph:graphStyle>
        <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
      </w4graph:graphStyle>
    </extensionElements>
    <laneSet id="sid-499dfba4-1449-4914-9e85-55b252800bad">
      <lane id="Approver" name="Approver">
        <extensionElements>
          <signavio:signavioMetaData metaKey="bgcolor" metaValue=""/>
          <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <flowNodeRef>approveInvoice</flowNodeRef>
        <flowNodeRef>invoice_approved</flowNodeRef>
      </lane>
      <lane id="teamAssistant" name="Team Assistant">
        <extensionElements>
          <signavio:signavioMetaData metaKey="bgcolor" metaValue=""/>
          <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <flowNodeRef>assignApprover</flowNodeRef>
        <flowNodeRef>reviewInvoice</flowNodeRef>
        <flowNodeRef>reviewSuccessful_gw</flowNodeRef>
        <flowNodeRef>invoiceNotProcessed</flowNodeRef>
        <flowNodeRef>StartEvent_1</flowNodeRef>
      </lane>
      <lane id="Accountant" name="Accountant">
        <extensionElements>
          <signavio:signavioMetaData metaKey="bgcolor" metaValue=""/>
          <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
          <w4graph:graphStyle>
            <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          </w4graph:graphStyle>
        </extensionElements>
        <flowNodeRef>prepareBankTransfer</flowNodeRef>
        <flowNodeRef>invoiceProcessed</flowNodeRef>
        <flowNodeRef>archiveInvoice</flowNodeRef>
      </lane>
    </laneSet>
    <userTask id="approveInvoice" camunda:assignee="\${approver}" camunda:formKey="app:approveInvoice.jsf" name="Approve Invoice" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="webService">
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
      <potentialOwner id="Bpmn_ResourceRole_m_HMwJ1_EeS1-pEyeWEPig" name="Approve Invoice Potential Owner">
        <resourceRef>Bpmn_Resource_U0nLMJ1_EeS1-pEyeWEPig</resourceRef>
      </potentialOwner>
    </userTask>
    <exclusiveGateway id="invoice_approved" name="Invoice&#xA;approved?" gatewayDirection="Diverging">
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
    <userTask id="assignApprover" camunda:assignee="demo" camunda:formKey="app:assignApprover.jsf" name="Assign&#xA;Approver" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="webService">
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
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <incoming>SequenceFlow_1</incoming>
      <outgoing>sequenceFlow_178</outgoing>
      <potentialOwner id="Bpmn_ResourceRole_cyfnwJ1_EeS1-pEyeWEPig" name="Assign Approver Potential Owner">
        <resourceRef>Bpmn_Resource_SVLUUJ1_EeS1-pEyeWEPig</resourceRef>
      </potentialOwner>
    </userTask>
    <userTask id="reviewInvoice" camunda:assignee="demo" camunda:formKey="app:reviewInvoice.jsf" name="Rechnung klären" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="webService">
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
      <potentialOwner id="Bpmn_ResourceRole_kGy70J1_EeS1-pEyeWEPig" name="Rechnung Klären Potential Owner">
        <resourceRef>Bpmn_Resource_SVLUUJ1_EeS1-pEyeWEPig</resourceRef>
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
    <startEvent id="StartEvent_1" camunda:formKey="app:startProcess.jsf" name="Invoice&#xA;received" isInterrupting="true">
      <extensionElements>
        <signavio:signavioMetaData metaKey="bgcolor" metaValue="#ffffff"/>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="109,183,0" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <outgoing>SequenceFlow_1</outgoing>
      <messageEventDefinition id="sid-14929637-5f1e-4d27-811c-ef5e4ddaa4c7" messageRef="sid-328811a0-7f72-468f-92de-6ab19e353312"/>
    </startEvent>
    <userTask id="prepareBankTransfer" camunda:candidateGroups="accounting" camunda:formKey="app:prepareBankTransfer.jsf" name="Prepare&#xD;&#xA;Bank&#xD;&#xA;Transfer" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="webService">
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
      <potentialOwner id="Bpmn_ResourceRole_qEZisJ1_EeS1-pEyeWEPig" name="Prepare Bank Transfer Potential Owner">
        <resourceRef>Bpmn_Resource_XNpfIJ1_EeS1-pEyeWEPig</resourceRef>
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
    <serviceTask id="archiveInvoice" camunda:delegateExpression="#{archiveService}" name="Archive&#xA;Invoice" completionQuantity="1" isForCompensation="false" startQuantity="1" implementation="webService">
      <extensionElements>
        <camunda:field name="text0" stringValue="Hello World"/>
        <camunda:field name="text1">
          <camunda:expression>\${genderBean.getGenderString(gender)}</camunda:expression>
        </camunda:field>
        <camunda:field name="text2">
          <camunda:expression>Hello \${gender == 'male' ? 'Mr.' : 'Mrs.'} \${name}</camunda:expression>
        </camunda:field>
        <camunda:field name="text3">
          <camunda:string><![CDATA[
            Hello World
        ]]></camunda:string>
        </camunda:field>
        <camunda:field name="text4">
          <camunda:string><![CDATA[
            <p>Hello World</p><br>
        ]]></camunda:string>
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
      <conditionExpression xsi:type="tFormalExpression" id="sid-0ed8a0cb-f28a-4689-bbd8-77dafd0ccfa0">\${approved}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="invoiceNotApproved" name="no" isImmediate="true" sourceRef="invoice_approved" targetRef="reviewInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-d4f3f0f7-79c3-4b1c-817e-13d9bdd96666">\${!approved}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="reviewSuccessful" name="yes" isImmediate="true" sourceRef="reviewSuccessful_gw" targetRef="approveInvoice">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-e669aead-8bad-4dbb-b282-e9f811e02f77">\${clarified == 'yes'}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="reviewNotSuccessful" name="no" isImmediate="true" sourceRef="reviewSuccessful_gw" targetRef="invoiceNotProcessed">
      <extensionElements>
        <signavio:signavioMetaData metaKey="userstory" metaValue="[]"/>
        <w4graph:graphStyle>
          <w4graph:basic background="255,255,255" foreground="0,0,0" autoResize="false" borderColor="100,100,100" collapsed="false"/>
          <w4graph:line routerType="Rectilinear" automaticRoute="true" closestRoute="false" avoidObstacleRoute="false"/>
        </w4graph:graphStyle>
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" id="sid-628a2fdc-7654-4273-930d-8e3127b9e8b2">\${clarified == 'no'}</conditionExpression>
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
  </process>
  <resource id="Bpmn_Resource_SVLUUJ1_EeS1-pEyeWEPig" w4:type="User" name="Team Assistant"/>
  <resource id="Bpmn_Resource_U0nLMJ1_EeS1-pEyeWEPig" w4:type="User" name="Approver"/>
  <resource id="Bpmn_Resource_XNpfIJ1_EeS1-pEyeWEPig" w4:type="User" name="Accountant"/>
  <bpmndi:BPMNDiagram id="sid-78cf0368-c97e-4dea-885f-0e535c20d6c7" name="Collaboration C.1.0">
    <bpmndi:BPMNPlane id="sid-39085760-f7ff-4491-a241-483b340d6533" bpmnElement="sid-e5defbed-c12d-4c0a-9b5e-0f187e35ffd3">
      <bpmndi:BPMNShape id="sid-46891B57-A9D3-4A8B-AEBF-D4BA5F3961AD_gui" bpmnElement="sid-46891B57-A9D3-4A8B-AEBF-D4BA5F3961AD" isHorizontal="true">
        <omgdc:Bounds height="205.0" width="1007.0" x="17.0" y="15.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel__lsVELdWEeSAMrpVrpCJkg" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="99.0" width="17.0" x="19.0" y="68.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Process_Engine_1_gui" bpmnElement="Process_Engine_1" isHorizontal="true">
        <omgdc:Bounds height="488.0" width="1009.0" x="15.0" y="270.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_HHGRALdXEeSAMrpVrpCJkg" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="195.0" width="17.0" x="17.0" y="417.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-744AEFB3-C93D-46A3-8976-EFA91784A51F_gui" bpmnElement="sid-744AEFB3-C93D-46A3-8976-EFA91784A51F" isHorizontal="true">
        <omgdc:Bounds height="205.0" width="977.0" x="47.0" y="15.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-36EA43D1-0FE6-4197-AC57-7A43785B784B_gui" bpmnElement="sid-36EA43D1-0FE6-4197-AC57-7A43785B784B" color:background-color="#6db700">
        <omgdc:Bounds height="30.0" width="30.0" x="99.0" y="118.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_kPOiQJ2DEeSTzqyH1_lhMw" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="57.0" x="86.0" y="148.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF_gui" bpmnElement="sid-05039C4F-59F7-4CBD-8C84-D35E27C7B5EF" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="167.0" y="93.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_qN11wJ2DEeSTzqyH1_lhMw" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="85.0" x="175.0" y="125.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44_gui" bpmnElement="sid-CFAC8502-0E69-4F08-BE36-8499B8C0FA44" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="315.0" y="93.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_rynbMJ2DEeSTzqyH1_lhMw" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="63.0" x="334.0" y="116.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-BC9AC0B6-1785-4E35-A974-7FEF1A586B9D_gui" bpmnElement="sid-BC9AC0B6-1785-4E35-A974-7FEF1A586B9D" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="941.0" y="63.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-40EC6574-E644-425C-8CE7-EE384F0C3520_gui" bpmnElement="sid-40EC6574-E644-425C-8CE7-EE384F0C3520" color:background-color="#2953e7">
        <omgdc:Bounds height="30.0" width="30.0" x="455.75" y="118.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qM6ILbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="73.0" x="434.0" y="84.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD_gui" bpmnElement="sid-64AFCE49-96A2-4A51-96CB-9DF689C37DAD" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="527.5" y="93.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_kQuFIJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="102.0" x="526.0" y="125.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-F0D29912-929D-491C-8D23-73BD80CF980A_gui" bpmnElement="sid-F0D29912-929D-491C-8D23-73BD80CF980A" color:background-color="#b98b00">
        <omgdc:Bounds height="40.0" width="40.0" x="652.5" y="113.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D_gui" bpmnElement="sid-B548B980-12E3-408E-9AC4-7031B85A8F2D" color:background-color="#2953e7">
        <omgdc:Bounds height="30.0" width="30.0" x="731.75" y="159.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qNhMLbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="90.0" x="701.0" y="125.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D_gui" bpmnElement="sid-6FC20E19-AF3A-4A77-8588-2D671C98D93D" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="797.5" y="134.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_nPj00J2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="51.0" width="75.0" x="810.0" y="149.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-0E349B8B-14A7-4565-988A-38F3A9B624D2_gui" bpmnElement="sid-0E349B8B-14A7-4565-988A-38F3A9B624D2" color:background-color="#2953e7">
        <omgdc:Bounds height="30.0" width="30.0" x="731.75" y="62.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qNhMbbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="42.0" x="725.0" y="45.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-282524E6-660F-431D-8F19-1C3E9E9DE817_gui" bpmnElement="sid-282524E6-660F-431D-8F19-1C3E9E9DE817" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="941.0" y="160.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Approver_gui" bpmnElement="Approver" isHorizontal="true">
        <omgdc:Bounds height="161.0" width="979.0" x="45.0" y="453.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_GpRFgLdXEeSAMrpVrpCJkg" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="64.0" width="17.0" x="47.0" y="501.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="teamAssistant_gui" bpmnElement="teamAssistant" isHorizontal="true">
        <omgdc:Bounds height="183.0" width="979.0" x="45.0" y="270.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_GKT4oLdXEeSAMrpVrpCJkg" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="102.0" width="17.0" x="47.0" y="310.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Accountant_gui" bpmnElement="Accountant" isHorizontal="true">
        <omgdc:Bounds height="144.0" width="979.0" x="45.0" y="614.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_Hq0CELdXEeSAMrpVrpCJkg" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="77.0" width="17.0" x="47.0" y="648.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="approveInvoice_gui" bpmnElement="approveInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="368.0" y="495.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel__UDvoJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="60.0" x="388.0" y="518.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoice_approved_gui" bpmnElement="invoice_approved" color:background-color="#b98b00">
        <omgdc:Bounds height="40.0" width="40.0" x="503.0" y="515.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_A3dcEJ2GEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="64.0" x="491.0" y="555.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="assignApprover_gui" bpmnElement="assignApprover" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="195.0" y="322.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_ogaYsJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="64.0" x="213.0" y="345.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="reviewInvoice_gui" bpmnElement="reviewInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="563.0" y="322.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_o6ZmAJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="69.0" x="579.0" y="345.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="reviewSuccessful_gw_gui" bpmnElement="reviewSuccessful_gw" color:background-color="#b98b00">
        <omgdc:Bounds height="40.0" width="40.0" x="708.0" y="342.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_N4NI8LbJEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="75.0" x="691.0" y="382.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoiceNotProcessed_gui" bpmnElement="invoiceNotProcessed" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="941.0" y="348.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_-pfvsJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="72.0" x="919.0" y="376.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1_gui" bpmnElement="StartEvent_1" color:background-color="#6db700">
        <omgdc:Bounds height="30.0" width="30.0" x="110.0" y="347.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_dBgFYJ2FEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="57.0" x="97.0" y="377.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="prepareBankTransfer_gui" bpmnElement="prepareBankTransfer" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="653.0" y="655.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_BPsV4J2GEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="51.0" width="63.0" x="672.0" y="670.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="invoiceProcessed_gui" bpmnElement="invoiceProcessed" color:background-color="#be0000">
        <omgdc:Bounds height="28.0" width="28.0" x="941.0" y="681.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_CAxNgJ2GEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="63.0" x="924.0" y="709.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="archiveInvoice_gui" bpmnElement="archiveInvoice" color:background-color="#c2d7eb">
        <omgdc:Bounds height="80.0" width="100.0" x="795.0" y="655.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_BpMbAJ2GEeSjQLtFitQlLQ" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="34.0" width="57.0" x="817.0" y="678.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="sid-71EF9530-A32A-49BC-A783-9B98A5801362_gui" bpmnElement="sid-71EF9530-A32A-49BC-A783-9B98A5801362">
        <omgdi:waypoint xsi:type="omgdc:Point" x="672.0" y="113.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="672.0" y="77.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="731.0" y="77.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="invoiceApproved_gui" bpmnElement="invoiceApproved">
        <omgdi:waypoint xsi:type="omgdc:Point" x="543.0" y="535.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="602.0" y="535.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="602.0" y="695.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="653.0" y="695.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qOIQLbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="27.0" x="548.0" y="540.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-C0540F47-C3C0-4FA8-B000-6D87640A6178_gui" bpmnElement="sid-C0540F47-C3C0-4FA8-B000-6D87640A6178">
        <omgdi:waypoint xsi:type="omgdc:Point" x="415.0" y="133.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="455.0" y="133.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-4AD2006C-9290-42B0-A904-DD8076B791C4_gui" bpmnElement="sid-4AD2006C-9290-42B0-A904-DD8076B791C4">
        <omgdi:waypoint xsi:type="omgdc:Point" x="485.0" y="133.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="527.0" y="133.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-3E8B2FCF-E408-4A5D-9455-8FDE7BB3EF96_gui" bpmnElement="sid-3E8B2FCF-E408-4A5D-9455-8FDE7BB3EF96">
        <omgdi:waypoint xsi:type="omgdc:Point" x="267.0" y="133.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="315.0" y="133.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-4686AFBC-E33A-4657-95A0-B2E27E704152_gui" bpmnElement="sid-4686AFBC-E33A-4657-95A0-B2E27E704152">
        <omgdi:waypoint xsi:type="omgdc:Point" x="672.0" y="153.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="672.0" y="174.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="731.0" y="174.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="invoiceNotApproved_gui" bpmnElement="invoiceNotApproved">
        <omgdi:waypoint xsi:type="omgdc:Point" x="523.0" y="515.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="523.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="563.0" y="362.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qOvULbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="23.0" x="528.0" y="494.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-915AC9A0-CD35-4DF2-93F7-4535397622F8_gui" bpmnElement="sid-915AC9A0-CD35-4DF2-93F7-4535397622F8">
        <omgdi:waypoint xsi:type="omgdc:Point" x="846.0" y="214.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="846.0" y="254.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="629.0" y="254.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="629.0" y="322.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-AB6EB7C8-DF5E-42C2-88D0-FA166583AF15_gui" bpmnElement="sid-AB6EB7C8-DF5E-42C2-88D0-FA166583AF15">
        <omgdi:waypoint xsi:type="omgdc:Point" x="576.0" y="173.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="576.0" y="254.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="261.0" y="254.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="261.0" y="322.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="reviewSuccessful_gui" bpmnElement="reviewSuccessful">
        <omgdi:waypoint xsi:type="omgdc:Point" x="728.0" y="342.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="728.0" y="305.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="418.0" y="305.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="418.0" y="495.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qOvUbbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="27.0" x="733.0" y="321.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="reviewNotSuccessful_gui" bpmnElement="reviewNotSuccessful">
        <omgdi:waypoint xsi:type="omgdc:Point" x="748.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="941.0" y="362.0"/>
        <bpmndi:BPMNLabel id="Bpmndi_BPMNLabel_4qOvUrbIEeS1kPPByrr18w" labelStyle="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
          <omgdc:Bounds height="17.0" width="23.0" x="753.0" y="367.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_180_gui" bpmnElement="sequenceFlow_180">
        <omgdi:waypoint xsi:type="omgdc:Point" x="468.0" y="535.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="503.0" y="535.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-6CB8539C-E02A-4496-94E7-17FAECB0D4B1_gui" bpmnElement="sid-6CB8539C-E02A-4496-94E7-17FAECB0D4B1">
        <omgdi:waypoint xsi:type="omgdc:Point" x="897.0" y="174.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="941.0" y="174.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_183_gui" bpmnElement="sequenceFlow_183">
        <omgdi:waypoint xsi:type="omgdc:Point" x="663.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="708.0" y="362.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-7A070DED-8B83-48E1-88A1-5543C481E7BC_gui" bpmnElement="sid-7A070DED-8B83-48E1-88A1-5543C481E7BC">
        <omgdi:waypoint xsi:type="omgdc:Point" x="216.0" y="173.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="216.0" y="253.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="125.0" y="253.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="125.0" y="347.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-D03CC374-8575-4F38-98B4-4DFF014C43CB_gui" bpmnElement="sid-D03CC374-8575-4F38-98B4-4DFF014C43CB">
        <omgdi:waypoint xsi:type="omgdc:Point" x="761.0" y="174.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="797.0" y="174.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sequenceFlow_178_gui" bpmnElement="sequenceFlow_178">
        <omgdi:waypoint xsi:type="omgdc:Point" x="295.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="325.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="325.0" y="535.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="368.0" y="535.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-90902E27-C1CD-4F90-A8F2-486DA4F42117_gui" bpmnElement="sid-90902E27-C1CD-4F90-A8F2-486DA4F42117">
        <omgdi:waypoint xsi:type="omgdc:Point" x="228.0" y="322.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="228.0" y="235.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="470.0" y="235.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="470.0" y="148.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-0518A412-1ED3-4CFD-A75C-69FF37EFFC16_gui" bpmnElement="sid-0518A412-1ED3-4CFD-A75C-69FF37EFFC16">
        <omgdi:waypoint xsi:type="omgdc:Point" x="596.0" y="322.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="596.0" y="237.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="746.0" y="237.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="746.0" y="189.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_2_gui" bpmnElement="SequenceFlow_2">
        <omgdi:waypoint xsi:type="omgdc:Point" x="753.0" y="695.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="795.0" y="695.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_3_gui" bpmnElement="SequenceFlow_3">
        <omgdi:waypoint xsi:type="omgdc:Point" x="895.0" y="695.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="941.0" y="695.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1_gui" bpmnElement="SequenceFlow_1">
        <omgdi:waypoint xsi:type="omgdc:Point" x="140.0" y="362.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="195.0" y="362.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-3019478F-48D5-4B85-95B1-E192B9BE4183_gui" bpmnElement="sid-3019478F-48D5-4B85-95B1-E192B9BE4183">
        <omgdi:waypoint xsi:type="omgdc:Point" x="761.0" y="77.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="941.0" y="77.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-26030150-7369-4B7F-8264-B3ABC62BA735_gui" bpmnElement="sid-26030150-7369-4B7F-8264-B3ABC62BA735">
        <omgdi:waypoint xsi:type="omgdc:Point" x="627.0" y="133.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="652.0" y="133.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="sid-7971C38C-2EF5-41F2-A24E-3FFCA069EDBF_gui" bpmnElement="sid-7971C38C-2EF5-41F2-A24E-3FFCA069EDBF">
        <omgdi:waypoint xsi:type="omgdc:Point" x="129.0" y="133.0"/>
        <omgdi:waypoint xsi:type="omgdc:Point" x="167.0" y="133.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
    <bpmndi:BPMNLabelStyle id="Bpmndi_BPMNLabelStyle_M44qwJ1_EeS1-pEyeWEPig">
      <omgdc:Font name="Segoe UI" size="11.00"/>
    </bpmndi:BPMNLabelStyle>
  </bpmndi:BPMNDiagram>
</definitions>
    `);
  }
}
