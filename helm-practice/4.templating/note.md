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
- 