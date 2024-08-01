- Template Action
    - {{}} - these are called action
- Root object(.) / Template metadata
    - {{.Values.image.repository}}
    - {{.Chart.Description}}
    - {{.Chart.Name}} {{.Chart.Version}} {{.Chart.AppVersion}}
    - {{.Chart.Annotations}}
    - {{.Release.Name}}
    - {{.Release.Namespace}}
    - {{.Release.IsInstall}}
    - {{.Release.IsUpgrade}}
    - {{.Release.Service}}
    - {{.Template.Name}}
    - {{.Template.BasePath}}
    - {{.Capabilities.APIVersions}}
    - {{.Capabilities.APIVersions.Has "batch/v1"}}
    - {{.Capabilities.KubeVersion}}
    - {{.Capabilities.HelmVersion}}
    - https://helm.sh/docs/chart_template_guide/builtin_objects/
- Pipe:
    - basic unix pipe ex. {{.Chart.Icon | default "missing" | upper | quote}}
- Function:
    - nindent - means newline indent
    - https://helm.sh/docs/chart_template_guide/function_list/
- Condition
    - {{- if .Values.fullnameOverride }} - why there is dash (-) in the beginning? Because if not this evaluation result will be replaced with a empty line in the output template , VVI
    - dash(-) removes whitespace including newline, beginning will go backword until it finds a characters
    - nindent puts output in a new line (prepends a new line to the beginning of the string.)
- With Condition:
    - changes scope of dot(.), to point to the root inside with we have to use ($.)
    - can have a else block like else.
- Use variable:
    - Same as go 
    - `{{- $ovrd:=.Values.custom.favorite.food}}`
      `{{$ovrd | indent 16}}`
- Loop 
- Variable
- Function

- Note:
Here are the concise differences between helm lint, helm template, and helm install --dry-run:

helm lint:

Purpose: Checks a Helm chart for possible issues.
Usage: Run it to validate the structure and syntax of your chart.
Output: Reports any warnings or errors in the chart.
helm template:

Purpose: Renders the templates in a Helm chart and outputs the raw Kubernetes manifest files.
Usage: Run it to see the generated YAML without applying it to a cluster.
Output: Displays the fully rendered Kubernetes manifests.
helm install --dry-run:

Purpose: Simulates an install, rendering templates and running all hooks, but does not actually install anything.
Usage: Run it to see what would happen if you installed the chart.
Output: Shows the rendered templates and simulates the installation process, providing information on any potential issues.
- Summary of practice
```
{{.Values.image.repository}}
{{.Chart.Description}}
{{.Chart.Name}} {{.Chart.Version}} {{.Chart.AppVersion}}
{{.Chart.Annotations}}
{{.Release.Name}}
{{.Release.Namespace}}
{{.Release.IsInstall}}
{{.Release.IsUpgrade}}
{{.Release.Service}}
{{.Template.Name}}
{{.Template.BasePath}}
{{.Capabilities.APIVersions}}
{{.Capabilities.APIVersions.Has "batch/v1"}}
{{.Capabilities.KubeVersion}}
{{.Capabilities.HelmVersion}}
{{.Chart.Icon | default "missing" | upper | quote}}
{{- "TEST WHo???"}}
{{- if .Values.serviceAccount.create }}
{{- "service account should be created" | nindent 16}}
{{- else}}
{{- "no service account for you!" | nindent 16}}
{{- end }}
{{"TESTING WITH"}}
{{with .Values.custom.favorite.countries}}
countries:
{{- toYaml . | nindent 2}}
{{- end}}
{{with .Values.custom.favorite.drink}}
drink: {{ . }}
{{- else}}
drink: "Cocacola"
{{- end}}
{{- $ovrd:=.Values.custom.favorite.food}}
{{$ovrd | indent 16}}

{{"RANGE NORMAL"}}
{{- range .Values.custom.favorite.countries }}
{{-  . | upper}}
{{end}}

{{"RANGE Index and Value"}}
{{range $index, $value := .Values.custom.favorite.countries }}
{{- printf "Index: %d, Value: %s" $index $value | indent 16 }}
{{end}}


{{"RANGE dictionary"}}
{{range $index, $value := .Values.image }}
{{- printf "DICT> Key: %s, Value: %s" $index $value | indent 16 }}
{{end}}

{{"Funny looping"}}
{{ repeat 16 "shit!" }}

{{"The beginner for loop increment"}}
{{- range untilStep 2 11 2 }}
    - containerPort: {{ . }}
      protocol: TCP
  {{- end }}

{{"The beginner for loop deccrement"}}
{{- range untilStep 10 1 -2 }}
    - containerPort: {{ . }}
      protocol: TCP
  {{- end }}

{{"Iterating tuple"}}
sizes:
    {{- range tuple "small" "medium" "large" }}
    - {{ . }}
    {{- end }}    
```